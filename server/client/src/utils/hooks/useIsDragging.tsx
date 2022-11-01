import { useEffect, useState } from 'react';

const useIsDragging = (targetElementID?: string) => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => setIsDragging(false);

    if (targetElementID) {
      document
        .getElementById(targetElementID)
        ?.addEventListener('dragstart', handleDragStart);
      document
        .getElementById(targetElementID)
        ?.addEventListener('dragstart', handleDragStart);
    } else {
      document.addEventListener('dragstart', handleDragStart);
      document.addEventListener('dragend', handleDragEnd);
    }

    return () => {
      if (targetElementID) {
        document
          .getElementById(targetElementID)
          ?.removeEventListener('dragstart', handleDragStart);
        document
          .getElementById(targetElementID)
          ?.removeEventListener('dragstart', handleDragStart);
      } else {
        document.removeEventListener('dragstart', handleDragStart);
        document.removeEventListener('dragend', handleDragEnd);
      }
    };
  }, []);

  return isDragging;
};

export default useIsDragging;
