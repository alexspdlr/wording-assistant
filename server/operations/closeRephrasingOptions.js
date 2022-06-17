import moveTextCursor from '../utils/moveTextCursor.js';

const closeRephrasingOptions = async (req, res, page) => {
  await moveTextCursor(page, '[dl-test=translator-target-input]', 'end');
};

export default closeRephrasingOptions;
