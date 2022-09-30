import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_UpdateTargetText } from '../../../types/socket';
import { Puppet } from '../../Puppet/Puppet';

const updateTargetText = (
  payload: SocketClientEventPayload_UpdateTargetText,
  targetPuppet?: Puppet
) => {
  const event: DispatchableEvent = {
    command: 'UPDATE_TARGET_TEXT',
    payload,
  };

  targetPuppet?.dispatchEvent(event);
};

export default updateTargetText;
