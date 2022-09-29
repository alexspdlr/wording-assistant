import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_SelectWordingAlternative } from '../../../types/socket';
import { PuppetMaster } from '../../PuppetMaster/PuppetMaster';

const selectWordingAlternative = (
  payload: SocketClientEventPayload_SelectWordingAlternative,
  targetPuppetMaster?: PuppetMaster
) => {
  const event: DispatchableEvent = {
    command: 'SELECT_WORDING_ALTERNATIVE',
    payload,
  };

  targetPuppetMaster?.dispatchEvent(event);
};

export default selectWordingAlternative;
