import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ReceivableEvent } from '../../types/index';
import {
  ActiveWorkerState,
  SocketClientEventPayload_DeselectText,
  SocketClientEventPayload_DeselectWord,
  SocketClientEventPayload_SelectText,
  SocketClientEventPayload_SelectWord,
  SocketClientEventPayload_SelectWordingAlternative,
  SocketServerEvent,
  SocketServerEventEndpoint,
} from '../../types/socket';
import { PuppetMaster } from '../PuppetMaster/PuppetMaster';
import deselectText from './dispatchableEvents/deselectText';
import deselectWord from './dispatchableEvents/deselectWord';
import selectText from './dispatchableEvents/selectText';
import selectWord from './dispatchableEvents/selectWord';
import selectWordingAlternative from './dispatchableEvents/selectWordingAlternative';
import selectTextCompleted from './receivableEvents/selectTextCompleted';
import selectTextStarted from './receivableEvents/selectTextStarted';
import startCompleted from './receivableEvents/startCompleted';
import printServerInfo from './util/printServerInfo';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public puppetMasters: PuppetMaster[];

  /* ------------------------------- CONSTRUCTOR ------------------------------ */

  constructor(server: HttpServer) {
    ServerSocket.instance = this;
    this.puppetMasters = [];
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: '*', //TODO: update this to only allow legit URL
      },
    });

    this.io.on('connect', this.startSocketListeners);
  }

  /* -------------------------------------------------------------------------- */
  /*                             RECEIVE FROM CLIENT                            */
  /* -------------------------------------------------------------------------- */

  private startSocketListeners = (socket: Socket) => {
    this.spawnPuppetMaster(socket.id);

    socket.on('disconnect', () => {
      this.killPuppetMaster(socket.id);
    });

    socket.on('selectText', (payload: SocketClientEventPayload_SelectText) => {
      selectText(payload, this.findPuppetMasterById(socket.id));
    });

    socket.on(
      'deselectText',
      (payload: SocketClientEventPayload_DeselectText) => {
        deselectText(payload, this.findPuppetMasterById(socket.id));
      }
    );

    socket.on('selectWord', (payload: SocketClientEventPayload_SelectWord) => {
      selectWord(payload, this.findPuppetMasterById(socket.id));
    });

    socket.on(
      'deselectWord',
      (payload: SocketClientEventPayload_DeselectWord) => {
        deselectWord(payload, this.findPuppetMasterById(socket.id));
      }
    );

    socket.on(
      'selectWordingAlternative',
      (payload: SocketClientEventPayload_SelectWordingAlternative) => {
        selectWordingAlternative(payload, this.findPuppetMasterById(socket.id));
      }
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                              RESPOND TO CLIENT                             */
  /* -------------------------------------------------------------------------- */

  private respondToClient = (socketId: string, event: ReceivableEvent) => {
    console.log('RESPOND TO CLIENT FROM SOCKET: ', JSON.stringify(event));

    switch (event.code) {
      case 'PUPPETMASTER_START_COMPLETED':
        startCompleted(event, socketId, this.emitToSocket);
        return;

      case 'PUPPET_SELECT_TEXT_STARTED':
        selectTextStarted(event, socketId, this.emitToSocket);
        return;

      case 'PUPPET_SELECT_TEXT_COMPLETED':
        selectTextCompleted(event, socketId, this.emitToSocket);
        return;

      default:
        return;
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                    UTILS                                   */
  /* -------------------------------------------------------------------------- */

  private emitToSocket = (socketId: string, event: SocketServerEvent) => {
    this.io.to(socketId).emit(event.endpoint, event.payload);
  };

  private spawnPuppetMaster = (socketId: string) => {
    const newPuppetMaster: PuppetMaster = new PuppetMaster(
      socketId,
      (event: ReceivableEvent) => this.respondToClient(socketId, event)
    );

    this.puppetMasters.push(newPuppetMaster);
  };

  private killPuppetMaster = (puppetMasterID: string) => {
    const target = this.findPuppetMasterById(puppetMasterID);
    this.puppetMasters = this.puppetMasters.filter(
      (pm) => pm.pmId !== target?.pmId
    );
    target?.kill();
  };

  private findPuppetMasterById = (id: string) => {
    return this.puppetMasters.find((el) => el.pmId === id);
  };

  public printPuppetMasters = () => printServerInfo(() => this.puppetMasters);
}
