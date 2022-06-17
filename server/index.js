import express from 'express';
import bodyParser from 'body-parser';
import generateRephrasingBase from './operations/generateRephrasingBase.js';
import setup from './operations/setup.js';
import showRephrasingOptions from './operations/showRephrasingOptions.js';
import closeRephrasingOptions from './operations/closeRephrasingOptions.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const page = await setup();

app.get('/', (req, res) => {
  res.send(page ? 'Page running 👍' : 'Page not running 👎');
});

app.post('/generate-rephrasing-base', async (req, res) => {
  console.log('/generate-rephrasing-base');
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

/*
app.post('/select-rephrasing-options', async (req, res) => {
  // await selectRephrasingOptions(req, res, page);
});
*/

app.listen(3001, () => console.log('DeepL-Puppeteer is running on port 3001.'));
