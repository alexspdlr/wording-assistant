const repeat = async (n, func) => {
  for (const i of [...Array(n).keys()]) {
    await func;
  }
};

export default repeat;
