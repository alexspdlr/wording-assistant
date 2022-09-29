import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_SelectText } from '../../../types/socket';
import { PuppetMaster } from '../../PuppetMaster/PuppetMaster';

const selectText = (
  payload: SocketClientEventPayload_SelectText,
  targetPuppetMaster?: PuppetMaster
) => {
  const event: DispatchableEvent = {
    command: 'SELECT_TEXT',
    payload,
  };

  targetPuppetMaster?.dispatchEvent(event);
};

export default selectText;
