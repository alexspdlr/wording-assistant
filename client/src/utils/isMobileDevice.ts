const isMobileDevice = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
    return true;
  }
  return false;
};

export default isMobileDevice;
