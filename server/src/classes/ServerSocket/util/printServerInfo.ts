import osu from 'node-os-utils';
import { PuppetMaster } from '../../PuppetMaster/PuppetMaster';

const printServerInfo = (getPuppetMasters: () => PuppetMaster[]) => {
  const updatedPuppetMasters = getPuppetMasters();

  setTimeout(async () => {
    const cpuUsage = await osu.cpu.usage();
    const memoryUsageMB =
      Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
    const maxMemoryMB =
      Math.round((process.memoryUsage().rss / 1024 / 1024) * 100) / 100;
    console.clear();
    process.stdout.cursorTo(0);
    process.stdout.write(
      `Memory usage: ${memoryUsageMB} MB | CPU usage: ${cpuUsage} % \n\nPUPPET MASTERS: \n${updatedPuppetMasters
        .map(
          (pm, i) => `\n${i}. PuppetMaster(${pm.pmId})\n\n${
            pm.puppetInfos.length > 0
              ? pm.puppetInfos
                  .map(
                    (pi: { id: any; activeWorkerState: any }, j: number) =>
                      `      Puppet (${pi.id}) - ${JSON.stringify(
                        pi.activeWorkerState
                      )}${j !== pm.puppetInfos.length - 1 ? '\n' : ''}`
                  )
                  .join('')
              : '      No puppets spawned yet.'
          } 
`
        )
        .join('')}`
    );

    printServerInfo(getPuppetMasters);
  }, 50);
};

export default printServerInfo;
