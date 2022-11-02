const isJSON = (data: any) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};

export default isJSON;
