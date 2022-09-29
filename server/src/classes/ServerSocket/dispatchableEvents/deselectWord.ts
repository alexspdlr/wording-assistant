import { DispatchableEvent } from '../../../types';
import { SocketClientEventPayload_DeselectWord } from '../../../types/socket';
import { Puppet } from '../../Puppet/Puppet';

const deselectWord = (
  payload: SocketClientEventPayload_DeselectWord,
  targetPuppet?: Puppet
) => {
  const event: DispatchableEvent = {
    command: 'DESELECT_WORD',
    payload,
  };

  targetPuppet?.dispatchEvent(event);
};

export default deselectWord;
