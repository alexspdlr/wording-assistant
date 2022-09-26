import waitUntil, { WAIT_FOREVER } from 'async-wait-until';

const waitUntilCustomized = (fn: () => boolean) => {
  return waitUntil(fn, {
    timeout: WAIT_FOREVER,
    intervalBetweenAttempts: 50,
  });
};

export default waitUntilCustomized;
