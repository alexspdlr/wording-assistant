function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: number | null = null;
  return function (this: any, ...args: any[]) {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

export default debounce;
