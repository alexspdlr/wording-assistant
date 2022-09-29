import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ReceivableEvent } from '../../types/index';
import {
  SocketClientEventPayload_DeselectText,
  SocketClientEventPayload_DeselectWord,
  SocketClientEventPayload_SelectText,
  SocketClientEventPayload_SelectWord,
  SocketClientEventPayload_SelectWordingAlternative,
  SocketServerEvent,
} from '../../types/socket';
import { Puppet } from '../Puppet/Puppet';
import deselectText from './dispatchableEvents/deselectText';
import deselectWord from './dispatchableEvents/deselectWord';
import selectText from './dispatchableEvents/selectText';
import selectWord from './dispatchableEvents/selectWord';
import selectWordingAlternative from './dispatchableEvents/selectWordingAlternative';
import deselectTextCompleted from './receivableEvents/deselectTextCompleted';
import deselectTextStarted from './receivableEvents/deselectTextStarted';
import selectTextCompleted from './receivableEvents/selectTextCompleted';
import selectTextStarted from './receivableEvents/selectTextStarted';
import startCompleted from './receivableEvents/startCompleted';
import printServerInfo from './util/printServerInfo';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public puppets: Puppet[];

  /* ------------------------------- CONSTRUCTOR ------------------------------ */

  constructor(server: HttpServer) {
    ServerSocket.instance = this;
    this.puppets = [];
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
    this.spawnPuppet(socket.id);

    console.time();

    socket.on('disconnect', () => {
      this.killPuppet(socket.id);
    });

    socket.on('selectText', (payload: SocketClientEventPayload_SelectText) => {
      selectText(payload, this.findPuppetById(socket.id));
    });

    socket.on(
      'deselectText',
      (payload: SocketClientEventPayload_DeselectText) => {
        deselectText(payload, this.findPuppetById(socket.id));
      }
    );

    socket.on('selectWord', (payload: SocketClientEventPayload_SelectWord) => {
      selectWord(payload, this.findPuppetById(socket.id));
    });

    socket.on(
      'deselectWord',
      (payload: SocketClientEventPayload_DeselectWord) => {
        deselectWord(payload, this.findPuppetById(socket.id));
      }
    );

    socket.on(
      'selectWordingAlternative',
      (payload: SocketClientEventPayload_SelectWordingAlternative) => {
        selectWordingAlternative(payload, this.findPuppetById(socket.id));
      }
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                              RESPOND TO CLIENT                             */
  /* -------------------------------------------------------------------------- */

  private respondToClient = (socketId: string, event: ReceivableEvent) => {
    switch (event.code) {
      case 'START_COMPLETED':
        startCompleted(event, socketId, this.emitToSocket);
        return;

      case 'SELECT_TEXT_STARTED':
        selectTextStarted(event, socketId, this.emitToSocket);
        return;

      case 'SELECT_TEXT_COMPLETED':
        selectTextCompleted(event, socketId, this.emitToSocket);
        return;

      case 'DESELECT_TEXT_STARTED':
        deselectTextStarted(event, socketId, this.emitToSocket);
        return;

      case 'DESELECT_TEXT_COMPLETED':
        deselectTextCompleted(event, socketId, this.emitToSocket);
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

  private spawnPuppet = (socketId: string) => {
    const newPuppet: Puppet = new Puppet(socketId, (event: ReceivableEvent) =>
      this.respondToClient(socketId, event)
    );

    this.puppets.push(newPuppet);
  };

  private killPuppet = (puppetID: string) => {
    const target = this.findPuppetById(puppetID);
    this.puppets = this.puppets.filter((puppet) => puppet.id !== target?.id);
    target?.kill();
  };

  private findPuppetById = (id: string) => {
    return this.puppets.find((puppet) => puppet.id === id);
  };

  public printPuppets = () => printServerInfo(() => this.puppets);
}
