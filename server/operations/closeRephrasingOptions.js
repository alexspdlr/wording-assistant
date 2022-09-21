const closeRephrasingOptions = async (requestBody, page) => {
  await page.keyboard.press('Escape');
  return {
    closed: true,
  };
};

export default closeRephrasingOptions;
