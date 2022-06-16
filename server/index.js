import express from 'express';
import bodyParser from 'body-parser';
import generateRephrasingBase from './operations/generateRephrasingBase.js';
import setup from './operations/setup.js';
import showRephrasingOptions from './operations/showRephrasingOptions.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const page = await setup();

app.get('/', (req, res) => {
  res.send(page ? 'Page running 👍' : 'Page not running 👎');
});

app.post('/generate-rephrasing-base', async (req, res) => {
  await generateRephrasingBase(req, res, page);
});

app.post('/show-rephrasing-options', async (req, res) => {
  await showRephrasingOptions(req, res, page);
});

app.post('/rephrase', async (req, res) => {});

app.listen(3001, () => console.log('DeepL-Puppeteer is running on port 3001.'));
