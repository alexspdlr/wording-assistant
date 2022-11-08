import osu from 'node-os-utils';
import { Puppet } from '../../Puppet/Puppet';

/**
 * Dev-util function that prints real-time information about the state of all puppets in the console
 * @param getPuppets
 * @param getWaitingPuppets
 */
const printServerInfo = (
  getPuppets: () => Puppet[],
  getWaitingPuppets: () => Puppet[]
) => {
  setTimeout(async () => {
    const cpuUsage = await osu.cpu.usage();
    const memoryUsageMB =
      Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;

    console.clear();
    process.stdout.cursorTo(0);
    process.stdout.write(
      `Memory usage: ${memoryUsageMB} MB | CPU usage: ${cpuUsage} % \n\nACTIVE PUPPETS: (${
        getPuppets().length
      })\n\n${getPuppets()
        .map(
          (puppet) =>
            `Puppet (${puppet.id}) - ${JSON.stringify(puppet.workerState)}\n`
        )
        .join('')}
        
WAITING PUPPETS: (${getWaitingPuppets().length})\n\n${getWaitingPuppets()
        .map(
          (waitingPuppet) =>
            `Puppet (${waitingPuppet.id}) - ${JSON.stringify(
              waitingPuppet.workerState
            )}\n`
        )
        .join('')}`
    );

    printServerInfo(getPuppets, getWaitingPuppets);
  }, 1);
};

export default printServerInfo;
