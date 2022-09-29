import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_DeselectText } from '../../../types/socket';
import { Puppet } from '../../Puppet/Puppet';

const deselectText = (
  payload: SocketClientEventPayload_DeselectText,
  targetPuppet?: Puppet
) => {
  const event: DispatchableEvent = {
    command: 'DESELECT_TEXT',
    payload,
  };

  targetPuppet?.dispatchEvent(event);
};

export default deselectText;
