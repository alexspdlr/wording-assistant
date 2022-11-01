import puppeteer from 'puppeteer';

const setup = async () => {
  /* Load broser & DeepL Page */
  console.log('puppeteer: _______', JSON.stringify(puppeteer));
  const browser = await puppeteer.launch({
    headless: true,
    dumpio: true,
    ignoreHTTPSErrors: false,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);
  await page.goto('https://www.deepl.com/en/translator#en/de/', {
    waitUntil: 'networkidle2',
  });
  return { page, browser };
};

export default setup;
