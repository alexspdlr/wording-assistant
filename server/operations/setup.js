import puppeteer from 'puppeteer';

const setup = async () => {
  /* Load broser & DeepL Page */
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultTimeout(8000);
  await page.goto('https://www.deepl.com/translator');

  /* Accept necessary cookies */
  await page.evaluate(() => {
    document
      .querySelector('[dl-test=cookie-banner-strict-accept-selected]')
      .click();
  });

  return page;
};

export default setup;
