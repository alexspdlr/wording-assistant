import moveTextCursor from '../utils/moveTextCursor.js';

const closeRephrasingOptions = async (req, res, page) => {
  await page.keyboard.press('Escape');
  res.json({
    closed: true,
  });
};

export default closeRephrasingOptions;
