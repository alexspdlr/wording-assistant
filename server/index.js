import express from 'express';
import bodyParser from 'body-parser';
import { fork } from 'child_process';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Page running 👍');
});

let processes = [];

const findProcessByID = (id) => processes.find((proc) => proc?.pid === id);

app.post('/setup-rephrasing', (req, res) => {
  console.log('/setup-rephrasing');

  // kill process if still active after 5 minutes

  const childProcess = fork('./process.mjs', { timeout: 300000 });

  // watch if this bug occurs again: https://github.com/nodejs/node/issues/37782
  childProcess.send({
    endpoint: '/setup-rephrasing',
    requestBody: JSON.stringify(req.body),
  });

  childProcess.on('message', (response) => {
    console.log('RESULT IN PARENT: ', response);
    const { result } = response;

    res.json({
      rephrasingResult: result,
      processID: childProcess.pid,
    });
  });

  childProcess.on('spawn', (data) => {
    if (!processes.includes(childProcess)) {
      processes.push(childProcess);
    }
  });

  childProcess.on('exit', (data) => {
    if (processes.includes(childProcess)) {
      processes.pop(childProcess);
    }
  });
});

app.post('/finish-rephrasing', (req, res) => {
  const targetProcess = findProcessByID(req.body.processID);
  if (targetProcess) targetProcess.kill('SIGINT');
});

[
  '/show-rephrasing-options',
  '/close-rephrasing-options',
  '/select-rephrasing-option',
].map((endpoint) =>
  app.post(endpoint, (req, res) => {
    const targetProcess = findProcessByID(req.body.processID);
    if (targetProcess) targetProcess.send({ endpoint, req, res });
  })
);

// OLD

/*
app.post('/generate-rephrasing-base', async (req, res) => {
  console.log('/generate-rephrasing-base');

  //TODO: implement abort Controller : https://leanylabs.com/blog/cancel-promise-abortcontroller/

  await generateRephrasingBase(req, res, page);
});

app.post('/show-rephrasing-options', async (req, res) => {
  console.log('/show-rephrasing-options');
  await showRephrasingOptions(req, res, page);
});

app.post('/close-rephrasing-options', async (req, res) => {
  console.log('/close-rephrasing-options');
  await closeRephrasingOptions(req, res, page);
}); 
  
app.post('/select-rephrasing-option', async (req, res) => {
  console.log('/select-rephrasing-option');
  await selectRephrasingOption(req, res, page);
});
*/

app.listen(3001, () => console.log('DeepL-Puppeteer is running on port 3001.'));
