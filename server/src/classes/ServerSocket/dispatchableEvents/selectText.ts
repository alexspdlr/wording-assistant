import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_SelectText } from '../../../types/socket';
import { Puppet } from '../../Puppet/Puppet';

const selectText = (
  payload: SocketClientEventPayload_SelectText,
  targetPuppet?: Puppet
) => {
  const event: DispatchableEvent = {
    command: 'SELECT_TEXT',
    payload,
  };

  targetPuppet?.dispatchEvent(event);
};

export default selectText;
