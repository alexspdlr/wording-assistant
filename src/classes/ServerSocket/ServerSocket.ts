import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import {
  ClientActionPayload_DeselectText,
  ClientActionPayload_moveCaret,
  ClientActionPayload_SelectText,
  ClientActionPayload_SelectWordingAlternative,
  ClientActionPayload_UpdateTargetText,
  ServerResponseEvent,
} from '../../types/socket';
import { Puppet } from '../Puppet/Puppet';
import { Queue } from '../Queue/Queue';
import printServerInfo from './util/printServerInfo';

/**
 *
 *  An object of the ServerSocket class:
 *
 *    - wraps & provides the http server with all socket endpoints that are available to the client
 *
 *    - prepares & manages the puppet queue, which is used to keep <minNumberOfMaintainedPuppets> puppets "ready-to-be-used" at all times,
 *      preventing cold starts for newly connecting clients (read more at http://wording-assistant.com/documentation)
 *
 *    - forwards incoming client-action-events to the corresponding puppet
 *
 *    - sends a server-response-event to the client as soon as the preceding client-action-event has been executed
 *
 *    - manages the state of actively used puppets in order to provide information about them to the app-maintaner or a client
 *
 */

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public activePuppets: Puppet[];
  public waitingPuppets: Queue<Puppet>;
  private minNumberOfMaintainedPuppets = 2;

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
        origin: 'http://localhost:8080',
      },
    });

    Array.from(Array(this.minNumberOfMaintainedPuppets)).forEach(() => {
      const newPuppet: Puppet = new Puppet(
        'unassigned',
        (event: ServerResponseEvent) =>
          this.respondToClient('unassigned', event)
      );

      this.waitingPuppets.enqueue(newPuppet);
    });

    this.io.on('connect', this.startSocketListeners);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CLIENT API                                 */
  /* -------------------------------------------------------------------------- */

  private startSocketListeners = (socket: Socket) => {
    // Spawn a puppet if no puppet is available in puppet-queue, else assign the "head"-puppet of the puppet-queue to the socket
    if (
      this.waitingPuppets.length() === 0 ||
      this.waitingPuppets.head()?.workerState.stateName !==
        'waitingForSelectText'
    ) {
      this.spawnPuppet(socket.id);
    } else {
      this.assignPuppetToSocket(socket.id);
    }

    socket.on('disconnect', () => {
      this.killPuppet(socket.id);
    });

    socket.on('selectText', (payload: ClientActionPayload_SelectText) => {
      this.findPuppetById(socket.id)?.dispatchEvent({
        endpoint: 'selectText',
        payload,
      });
    });

    socket.on('deselectText', (payload: ClientActionPayload_DeselectText) => {
      this.findPuppetById(socket.id)?.dispatchEvent({
        endpoint: 'deselectText',
        payload,
      });
    });

    socket.on('moveCaret', (payload: ClientActionPayload_moveCaret) => {
      this.findPuppetById(socket.id)?.dispatchEvent({
        endpoint: 'moveCaret',
        payload,
      });
    });

    socket.on(
      'updateTargetText',
      (payload: ClientActionPayload_UpdateTargetText) => {
        this.findPuppetById(socket.id)?.dispatchEvent({
          endpoint: 'updateTargetText',
          payload,
        });
      }
    );

    socket.on(
      'selectWordingAlternative',
      (payload: ClientActionPayload_SelectWordingAlternative) => {
        this.findPuppetById(socket.id)?.dispatchEvent({
          endpoint: 'selectWordingAlternative',
          payload,
        });
      }
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                              RESPOND TO CLIENT                             */
  /* -------------------------------------------------------------------------- */

  private respondToClient = (socketId: string, event: ServerResponseEvent) => {
    this.io.to(socketId).emit(event.endpoint, event.payload);
  };

  /* -------------------------------------------------------------------------- */
  /*                                    UTILS                                   */
  /* -------------------------------------------------------------------------- */

  private spawnPuppet = (socketId: string) => {
    const newPuppet: Puppet = new Puppet(
      socketId,
      (event: ServerResponseEvent) => this.respondToClient(socketId, event)
    );

    this.activePuppets.push(newPuppet);
  };

  private assignPuppetToSocket = (socketId: string) => {
    const targetPuppet = this.waitingPuppets.dequeue();

    if (targetPuppet) this.activePuppets.push(targetPuppet);

    targetPuppet?.assignPuppet(socketId, (event: ServerResponseEvent) =>
      this.respondToClient(socketId, event)
    );

    const newPuppet: Puppet = new Puppet(
      'unassigned',
      (event: ServerResponseEvent) => this.respondToClient('unassigned', event)
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
