import puppeteer from 'puppeteer';

const setup = async () => {
  /* Load broser & DeepL Page */
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(8000);
  await page.goto('https://www.deepl.com/en/translator#en/de/');
  return { page, browser };
};

export default setup;
