import { useEffect, useState } from 'react';

const useMouseIsDown = () => {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setMouseIsPressed(true);
    const handleMouseUp = () => setMouseIsPressed(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return mouseIsPressed;
};

export default useMouseIsDown;
