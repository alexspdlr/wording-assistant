const closeRephrasingOptions = async (req, res, page) => {
  await page.keyboard.press('Escape');
  res.json({
    closed: true,
  });
};

export default closeRephrasingOptions;
