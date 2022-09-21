import express from 'express';
import bodyParser from 'body-parser';
import { Worker } from 'worker_threads';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Page running 👍');
});

let workers = [];

const findWorkerByID = (id) => workers.find((worker) => worker.id === id);

app.post('/setup-rephrasing', (req, res) => {
  console.time();

  console.log('/setup-rephrasing');

  const worker = new Worker('./process.mjs');

  if (!workers.includes(worker)) {
    workers.push(worker);
  }

  worker.on('message', (response) => {
    console.log('RESULT IN PARENT: ', response);
    const { result } = response;

    console.timeEnd();
    res.json({
      rephrasingResult: result,
      processID: worker.pid,
    });
  });

  worker.on('exit', (code) => {
    if (workers.includes(worker)) {
      workers.pop(worker);
    }
  });

  //Post message to the worker thread.
  worker.postMessage({
    endpoint: '/setup-rephrasing',
    requestBody: JSON.stringify(req.body),
  });
});

app.post('/finish-rephrasing', (req, res) => {
  const targetProcess = findWorkerByID(req.body.processID);
  if (targetProcess) targetProcess.kill('SIGINT');
});

[
  '/show-rephrasing-options',
  '/close-rephrasing-options',
  '/select-rephrasing-option',
].map((endpoint) =>
  app.post(endpoint, (req, res) => {
    const targetProcess = findWorkerByID(req.body.processID);
    if (targetProcess) targetProcess.send({ endpoint, req, res });
  })
);

app.listen(3001, () => console.log('DeepL-Puppeteer is running on port 3001.'));

/*

USING CHILD_workers

import express from 'express';
import bodyParser from 'body-parser';
import { fork } from 'child_process';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Page running 👍');
});

let workers = [];

const findWorkerByID = (id) => workers.find((proc) => proc?.pid === id);

app.post('/setup-rephrasing', (req, res) => {
  console.log('/setup-rephrasing');

  // kill process if still active after 5 minutes

  const worker = fork('./process.mjs', { timeout: 300000 });

  // watch if this bug occurs again: https://github.com/nodejs/node/issues/37782
  worker.send({
    endpoint: '/setup-rephrasing',
    requestBody: JSON.stringify(req.body),
  });

  worker.on('message', (response) => {
    console.log('RESULT IN PARENT: ', response);
    const { result } = response;

    res.json({
      rephrasingResult: result,
      processID: worker.pid,
    });
  });

  worker.on('spawn', (data) => {
    if (!workers.includes(worker)) {
      workers.push(worker);
    }
  });

  worker.on('exit', (data) => {
    if (workers.includes(worker)) {
      workers.pop(worker);
    }
  });
});

app.post('/finish-rephrasing', (req, res) => {
  const targetProcess = findWorkerByID(req.body.processID);
  if (targetProcess) targetProcess.kill('SIGINT');
});

[
  '/show-rephrasing-options',
  '/close-rephrasing-options',
  '/select-rephrasing-option',
].map((endpoint) =>
  app.post(endpoint, (req, res) => {
    const targetProcess = findWorkerByID(req.body.processID);
    if (targetProcess) targetProcess.send({ endpoint, req, res });
  })
);



app.listen(3001, () => console.log('DeepL-Puppeteer is running on port 3001.'));

*/
