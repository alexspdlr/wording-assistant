import puppeteer from 'puppeteer';

const setup = async () => {
  /* Load broser & DeepL Page */
  console.log('puppeteer: _______', JSON.stringify(puppeteer));
  const browser = await puppeteer.launch({
    headless: true,
    dumpio: true,
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--devtools-flags=disable',
    ],
  });

  console.log('AFTER BRWOSER LAUNCH');

  const page = await browser.newPage();
  page.setDefaultTimeout(8000);
  await page.goto('https://www.deepl.com/en/translator#en/de/');
  return { page, browser };
};

export default setup;
