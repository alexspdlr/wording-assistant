/**
 * Util function that can be used to wait for a certain period of time
 * @param time (in ms)
 * @returns a promise that is resolved as soon as the specified amount of time has passed
 */
const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default delay;
