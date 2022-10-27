import puppeteer from 'puppeteer';

const setup = async () => {
  /* Load broser & DeepL Page */
  const browser = await puppeteer.launch({
    // executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disabled-setupid-sandbox'],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(8000);
  await page.goto('https://www.deepl.com/en/translator#en/de/');
  return { page, browser };
};

export default setup;
