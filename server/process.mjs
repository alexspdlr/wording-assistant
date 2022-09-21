import setupRephrasing from './operations/setupRephrasing.js';
import setup from './operations/setup.js';
import showRephrasingOptions from './operations/showRephrasingOptions.js';
import closeRephrasingOptions from './operations/closeRephrasingOptions.js';
import selectRephrasingOption from './operations/selectRephrasingOption.js';

console.time();

const page = await setup();

console.timeEnd();

process.on('message', async (message) => {
  console.log('child message: ', message.requestBody);

  const response = await selectOperation(
    message.endpoint,
    JSON.parse(message.requestBody)
  );

  process.send(response);
});

const selectOperation = async (endpoint, requestBody) => {
  switch (endpoint) {
    case '/setup-rephrasing':
      return await setupRephrasing(requestBody, page);

    case '/show-rephrasing-options':
      return await showRephrasingOptions(requestBody, page);

    case '/close-rephrasing-options':
      return await closeRephrasingOptions(requestBody, page);

    case '/select-rephrasing-option':
      return await selectRephrasingOption(requestBody, page);

    case '/finish-rephrasing':
      // do nothing
      return {};

    default:
      // do nothing
      return {};
  }
};
