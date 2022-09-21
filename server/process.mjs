import setupRephrasing from './operations/setupRephrasing.js';
import setup from './operations/setup.js';
import showRephrasingOptions from './operations/showRephrasingOptions.js';
import closeRephrasingOptions from './operations/closeRephrasingOptions.js';
import selectRephrasingOption from './operations/selectRephrasingOption.js';
import { parentPort } from 'worker_threads';

const page = await setup();

parentPort.on('message', async (message) => {
  console.log('child message: ', message.requestBody);

  const response = await selectOperation(
    message.endpoint,
    JSON.parse(message.requestBody)
  );

  parentPort.postMessage(response);
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
