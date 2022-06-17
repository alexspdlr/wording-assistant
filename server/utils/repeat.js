const repeat = async (n, func) => {
  const functions = Array(n).fill(func);

  for (const i of functions) {
    const result = await i;
    console.log(result);
  }
};

export default repeat;
