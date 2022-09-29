import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_DeselectText } from '../../../types/socket';
import { PuppetMaster } from '../../PuppetMaster/PuppetMaster';

const deselectText = (
  payload: SocketClientEventPayload_DeselectText,
  targetPuppetMaster?: PuppetMaster
) => {
  const event: DispatchableEvent = {
    command: 'DESELECT_TEXT',
    payload,
  };

  targetPuppetMaster?.dispatchEvent(event);
};

export default deselectText;
