import osu from 'node-os-utils';
import { Puppet } from '../../Puppet/Puppet';

const printServerInfo = (getPuppets: () => Puppet[]) => {
  const updatedPuppets = getPuppets();

  setTimeout(async () => {
    const cpuUsage = await osu.cpu.usage();
    const memoryUsageMB =
      Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;

    console.clear();
    process.stdout.cursorTo(0);
    process.stdout.write(
      `Memory usage: ${memoryUsageMB} MB | CPU usage: ${cpuUsage} % \n\nPUPPETS: \n\n${updatedPuppets
        .map(
          (puppet) =>
            `Puppet (${puppet.id}) - ${JSON.stringify(puppet.workerState)}\n`
        )
        .join('')}`
    );

    printServerInfo(getPuppets);
  }, 1);
};

export default printServerInfo;
