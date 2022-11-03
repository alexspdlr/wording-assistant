import puppeteer from 'puppeteer';

const setup = async () => {
  /* Load broser & DeepL Page */
  console.log('puppeteer: _______', JSON.stringify(puppeteer));
  const browser = await puppeteer.launch({
    headless: true,
    dumpio: true,
    args: [
      '--headless',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--no-gpu',
      '--disable-dev-shm-usage',
    ],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);
  await page.goto('https://www.deepl.com/en/translator#en/de/', {
    waitUntil: 'networkidle2',
  });
  console.log(' DeepL page has loaded !!! ');
  return { page, browser };
};

export default setup;
