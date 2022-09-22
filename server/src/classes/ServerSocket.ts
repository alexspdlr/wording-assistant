import { ChildProcess, fork } from 'child_process';
import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { Worker, WorkerOptions } from 'worker_threads';
import { PuppetMaster } from './PuppetMaster/PuppetMaster';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  /** Master list of all connected users */
  public puppetMasters: PuppetMaster[];

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

  startSocketListeners = (socket: Socket) => {
    this.spawnPuppetMaster(socket.id);

    socket.on('disconnect', () => {
      this.killPuppetMaster(socket.id);
    });
  };

  spawnPuppetMaster = (puppetMasterID: string) => {
    const newPuppetMaster: PuppetMaster = new PuppetMaster(puppetMasterID);
    this.puppetMasters.push(newPuppetMaster);
  };

  killPuppetMaster = (puppetMasterID: string) => {
    const target = this.findPuppetMasterById(puppetMasterID);
    this.puppetMasters = this.puppetMasters.filter(
      (pm) => pm.pmId !== target?.pmId
    );
    target?.kill();
  };

  findPuppetMasterById = (id: string) => {
    return this.puppetMasters.find((el) => el.pmId === id);
  };
}
