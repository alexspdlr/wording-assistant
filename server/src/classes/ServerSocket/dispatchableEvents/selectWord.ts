import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_SelectWord } from '../../../types/socket';
import { Puppet } from '../../Puppet/Puppet';

const selectWord = (
  payload: SocketClientEventPayload_SelectWord,
  targetPuppet?: Puppet
) => {
  const event: DispatchableEvent = {
    command: 'SELECT_WORD',
    payload,
  };

  targetPuppet?.dispatchEvent(event);
};

export default selectWord;
