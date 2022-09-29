import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_SelectWordingAlternative } from '../../../types/socket';
import { Puppet } from '../../Puppet/Puppet';

const selectWordingAlternative = (
  payload: SocketClientEventPayload_SelectWordingAlternative,
  targetPuppet?: Puppet
) => {
  const event: DispatchableEvent = {
    command: 'SELECT_WORDING_ALTERNATIVE',
    payload,
  };

  targetPuppet?.dispatchEvent(event);
};

export default selectWordingAlternative;
