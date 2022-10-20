import { useEffect, useState } from 'react';

const useWindowIsFocused = () => {
  const [windowIsFocused, setWindowIsFocused] = useState(false);

  useEffect(() => {
    const focus = () => setWindowIsFocused(true);
    const blur = () => setWindowIsFocused(false);

    window.addEventListener('focus', focus);
    window.addEventListener('blur', blur);

    return () => {
      window.removeEventListener('focus', focus);
      window.removeEventListener('blur', blur);
    };
  }, []);

  return windowIsFocused;
};

export default useWindowIsFocused;
