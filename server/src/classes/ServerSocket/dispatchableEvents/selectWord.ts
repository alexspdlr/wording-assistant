import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_SelectWord } from '../../../types/socket';
import { PuppetMaster } from '../../PuppetMaster/PuppetMaster';

const selectWord = (
  payload: SocketClientEventPayload_SelectWord,
  targetPuppetMaster?: PuppetMaster
) => {
  const event: DispatchableEvent = {
    command: 'SELECT_WORD',
    payload,
  };

  targetPuppetMaster?.dispatchEvent(event);
};

export default selectWord;
