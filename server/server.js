const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

app.post('/result', async (req, res) => {
  console.log('server triggered');

  const clientInput = req.body.input;

  console.log('clientInput: ', clientInput);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.deepl.com/translator');

  /*
  await page.$eval(
    '.lmt__textarea.lmt__source_textarea.lmt__textarea_base_style',
    (textArea) => (textArea.value = clientInput)
  );
  */

  await page.evaluate((clientInput) => {
    const textArea = document.querySelector(
      '.lmt__textarea.lmt__source_textarea.lmt__textarea_base_style'
    );
    textArea.value = clientInput;
  }, clientInput);

  await page.keyboard.press('Tab');
  await page.keyboard.down('ShiftLeft');
  await page.keyboard.press('Tab');
  await page.keyboard.up('ShiftLeft');

  const inputHTML = await page.evaluate(
    () =>
      Array.from(
        document.querySelectorAll('.lmt__textarea.lmt__textarea_dummydiv')
      )[0].innerHTML
  );

  const selector = '.lmt__textarea.lmt__textarea_dummydiv';
  await page.waitForFunction(
    (selector) =>
      Array.from(document.querySelectorAll(selector))[1].innerHTML !== '\r\n',
    {},
    selector
  );

  const outputHTML = await page.evaluate(
    () =>
      Array.from(
        document.querySelectorAll('.lmt__textarea.lmt__textarea_dummydiv')
      )[1].innerHTML
  );

  await page.$eval('button.lmt__language_container_switch', (button) =>
    button.click()
  );

  await page.waitForFunction(
    (selector, outputHTML) => {
      const targetHTML = Array.from(document.querySelectorAll(selector))[1]
        .innerHTML;
      return targetHTML !== outputHTML && targetHTML !== '\r\n';
    },
    {},
    selector,
    outputHTML
  );

  const result = await page.$eval(
    '#target-dummydiv',
    (element) => element.innerHTML
  );

  console.log('RESULT: ', result);

  /**
   * TODO:
   *
   * send output to client
   *
   * Loop:
   *
   * select clicked word in client
   *
   * send client selection to server
   *
   * tab to BEGINNING of selected word in deepl
   *
   * send alternatives to client
   *
   * choose alternative or close alternatives in client
   *
   * send response to server
   *
   * apply action selected in client
   *
   * reset cursor in deepl
   *
   * -> repeat
   */

  await browser.close();

  res.json({
    result: result,
  });
});

app.listen(3001, () => console.log('Example app is listening on port 3001.'));
