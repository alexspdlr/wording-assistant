import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ReceivableEvent } from '../../types/index';
import {
  SocketClientEventPayload_DeselectText,
  SocketClientEventPayload_MoveCursor,
  SocketClientEventPayload_SelectText,
  SocketClientEventPayload_SelectWordingAlternative,
  SocketClientEventPayload_UpdateTargetText,
  SocketServerEvent,
} from '../../types/socket';
import { Puppet } from '../Puppet/Puppet';
import { Queue } from '../Queue/Queue';
import deselectText from './dispatchableEvents/deselectText';
import updateTargetText from './dispatchableEvents/updateTargetText';
import selectText from './dispatchableEvents/selectText';
import moveCursor from './dispatchableEvents/moveCursor';
import selectWordingAlternative from './dispatchableEvents/selectWordingAlternative';
import deselectTextCompleted from './receivableEvents/deselectTextCompleted';
import deselectTextStarted from './receivableEvents/deselectTextStarted';
import selectTextCompleted from './receivableEvents/selectTextCompleted';
import selectTextStarted from './receivableEvents/selectTextStarted';
import startCompleted from './receivableEvents/startCompleted';
import printServerInfo from './util/printServerInfo';
import moveCursorStarted from './receivableEvents/moveCursorStarted';
import moveCursorCompleted from './receivableEvents/moveCursorCompleted';
import updateTargetTextStarted from './receivableEvents/updateTargetTextStarted';
import updateTargetTextCompleted from './receivableEvents/updateTargetTextCompleted';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public activePuppets: Puppet[];
  public waitingPuppets: Queue<Puppet>;
  private minNumberOfMaintainedPuppets = 0;

  /* ------------------------------- CONSTRUCTOR ------------------------------ */

  constructor(server: HttpServer) {
    ServerSocket.instance = this;
    this.activePuppets = [];
    this.waitingPuppets = new Queue<Puppet>();
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: '*', //TODO: update this to only allow legit URL
      },
    });

    Array.from(Array(this.minNumberOfMaintainedPuppets)).forEach(() => {
      const newPuppet: Puppet = new Puppet(
        'unassigned',
        (event: ReceivableEvent) => this.respondToClient('unassigned', event)
      );

      this.waitingPuppets.enqueue(newPuppet);
    });

    this.io.on('connect', this.startSocketListeners);
  }

  /* -------------------------------------------------------------------------- */
  /*                             RECEIVE FROM CLIENT                            */
  /* -------------------------------------------------------------------------- */

  private startSocketListeners = (socket: Socket) => {
    // spawn puppet if no puppet available in queue, else assign head of queue to socket
    if (
      this.waitingPuppets.length() === 0 ||
      this.waitingPuppets.head()?.workerState.stateName !==
        'waitingForSelectText'
    ) {
      this.spawnPuppet(socket.id);
    } else {
      this.assignPuppetToSocket(socket.id);
    }

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

    socket.on('moveCursor', (payload: SocketClientEventPayload_MoveCursor) => {
      moveCursor(payload, this.findPuppetById(socket.id));
    });

    socket.on(
      'updateTargetText',
      (payload: SocketClientEventPayload_UpdateTargetText) => {
        updateTargetText(payload, this.findPuppetById(socket.id));
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

      case 'MOVE_CURSOR_STARTED':
        moveCursorStarted(event, socketId, this.emitToSocket);
        return;

      case 'MOVE_CURSOR_COMPLETED':
        moveCursorCompleted(event, socketId, this.emitToSocket);
        return;

      case 'UPDATE_TARGET_TEXT_STARTED':
        updateTargetTextStarted(event, socketId, this.emitToSocket);
        return;

      case 'UPDATE_TARGET_TEXT_COMPLETED':
        updateTargetTextCompleted(event, socketId, this.emitToSocket);
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

    this.activePuppets.push(newPuppet);
  };

  private assignPuppetToSocket = (socketId: string) => {
    const targetPuppet = this.waitingPuppets.dequeue();

    if (targetPuppet) this.activePuppets.push(targetPuppet);

    targetPuppet?.assignPuppet(socketId, (event: ReceivableEvent) =>
      this.respondToClient(socketId, event)
    );

    const newPuppet: Puppet = new Puppet(
      'unassigned',
      (event: ReceivableEvent) => this.respondToClient('unassigned', event)
    );

    this.waitingPuppets.enqueue(newPuppet);
  };

  private killPuppet = (puppetID: string) => {
    const target = this.findPuppetById(puppetID);
    this.activePuppets = this.activePuppets.filter(
      (activePuppets) => activePuppets.id !== target?.id
    );
    target?.kill();
  };

  private findPuppetById = (id: string) => {
    return this.activePuppets.find((puppet) => puppet.id === id);
  };

  public printPuppets = () =>
    printServerInfo(
      () => this.activePuppets,
      () => this.waitingPuppets.allItems()
    );
}
