import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const useClickAway = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  onClickAway: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }
      onClickAway(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, onClickAway]);
};

export default useClickAway;
