import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_MoveCursor } from '../../../types/socket';
import { Puppet } from '../../Puppet/Puppet';

const moveCursor = (
  payload: SocketClientEventPayload_MoveCursor,
  targetPuppet?: Puppet
) => {
  const event: DispatchableEvent = {
    command: 'MOVE_CURSOR',
    payload,
  };

  targetPuppet?.dispatchEvent(event);
};

export default moveCursor;
