const selectRephrasingOption = async (req, res, page) => {
  const alternative = req.body.alternative;

  await page.keyboard.press('Escape');
  res.json({
    closed: true,
  });
};

export default selectRephrasingOption;
