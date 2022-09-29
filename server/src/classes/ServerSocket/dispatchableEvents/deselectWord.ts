import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_DeselectWord } from '../../../types/socket';
import { PuppetMaster } from '../../PuppetMaster/PuppetMaster';

const deselectWord = (
  payload: SocketClientEventPayload_DeselectWord,
  targetPuppetMaster?: PuppetMaster
) => {
  const event: DispatchableEvent = {
    command: 'DESELECT_WORD',
    payload,
  };

  targetPuppetMaster?.dispatchEvent(event);
};

export default deselectWord;
