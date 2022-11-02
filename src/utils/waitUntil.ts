import waitUntil, { WAIT_FOREVER } from 'async-wait-until';

const waitUntilCustomized = (
  fn: () => boolean,
  customTimeout?: number,
  customIntervalBetweenAttempts?: number
) => {
  return waitUntil(fn, {
    timeout: customTimeout || 20000,
    intervalBetweenAttempts: customIntervalBetweenAttempts || 50,
  });
};

export default waitUntilCustomized;
