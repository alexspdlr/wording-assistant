import { ChildProcess, fork } from 'child_process';
import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { Worker, WorkerOptions } from 'worker_threads';
import { PuppetMaster } from './PuppetMaster/PuppetMaster';
import os from 'os';
import osu from 'node-os-utils';
import { DispatchableEvent, ReceivableEvent } from '../types/index';
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

    socket.on('selectText', (payload) => {
      const event: DispatchableEvent = {
        command: 'SELECT_TEXT',
        payload,
      };
      this.findPuppetMasterById(socket.id)?.forwardClientEvent(event);
    });

    socket.on('deselectText', (payload) => {
      const event: DispatchableEvent = {
        command: 'DESELECT_TEXT',
        payload,
      };
      this.findPuppetMasterById(socket.id)?.forwardClientEvent(event);
    });

    socket.on('selectWord', (payload) => {
      const event: DispatchableEvent = {
        command: 'SELECT_WORD',
        payload,
      };
      this.findPuppetMasterById(socket.id)?.forwardClientEvent(event);
    });

    socket.on('deselectWord', (payload) => {
      const event: DispatchableEvent = {
        command: 'DESELECT_WORD',
        payload,
      };
      this.findPuppetMasterById(socket.id)?.forwardClientEvent(event);
    });

    socket.on('selectWordingAlternative', (payload) => {
      const event: DispatchableEvent = {
        command: 'SELECT_WORDING_ALTERNATIVE',
        payload,
      };
      this.findPuppetMasterById(socket.id)?.forwardClientEvent(event);
    });
  };

  respondToClient = (event: ReceivableEvent) => {
    console.log('___FROM SOCKET__ respond to client : ', event);
  };

  spawnPuppetMaster = (puppetMasterID: string) => {
    const newPuppetMaster: PuppetMaster = new PuppetMaster(
      puppetMasterID,
      this.respondToClient
    );

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

  printPuppetMasters = () => {
    setTimeout(async () => {
      const cpuUsage = await osu.cpu.usage();
      const memoryUsageMB =
        Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
      const maxMemoryMB =
        Math.round((process.memoryUsage().rss / 1024 / 1024) * 100) / 100;
      console.clear();
      process.stdout.cursorTo(0);
      process.stdout.write(
        `Memory usage: ${memoryUsageMB} MB | CPU usage: ${cpuUsage} % \n\nPUPPET MASTERS: \n${this.puppetMasters
          .map(
            (pm, i) => `\n${i}. PuppetMaster(${pm.pmId})\n\n${
              pm.puppetInfos.length > 0
                ? pm.puppetInfos
                    .map(
                      (pi: { id: any; puppetState: any }, j: number) =>
                        `      Puppet (${pi.id}) - ${JSON.stringify(
                          pi.puppetState
                        )}${j !== pm.puppetInfos.length - 1 ? '\n' : ''}`
                    )
                    .join('')
                : '      No puppets spawned yet.'
            } 
  `
          )
          .join('')}`
      );

      this.printPuppetMasters();
    }, 50);
  };
}
