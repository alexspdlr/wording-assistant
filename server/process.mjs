import setupRephrasing from './operations/setupRephrasing.js';
import setup from './operations/setup.js';
import showRephrasingOptions from './operations/showRephrasingOptions.js';
import closeRephrasingOptions from './operations/closeRephrasingOptions.js';
import selectRephrasingOption from './operations/selectRephrasingOption.js';

const page = await setup();

process.on('message', (message) => {
  console.log('got to child !!!!!!!');
  //const response = selectOperation(message.endpoint, message.req, message.res);
  process.send('result');
});

const selectOperation = async (endpoint, req, res) => {
  switch (endpoint) {
    case '/setup-rephrasing':
      return await setupRephrasing(req, res, page);

    case '/show-rephrasing-options':
      return await showRephrasingOptions(req, res, page);

    case '/close-rephrasing-options':
      return await closeRephrasingOptions(req, res, page);

    case '/select-rephrasing-option':
      return await selectRephrasingOption(req, res, page);

    case '/finish-rephrasing':
      // do nothing
      return {};

    default:
      // do nothing
      return {};
  }
};
