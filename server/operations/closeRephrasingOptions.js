const closeRephrasingOptions = async (req, res, page) => {
  await page.keyboard.press('Escape');
  return {
    closed: true,
  };
};

export default closeRephrasingOptions;
