import puppeteer from 'puppeteer';
import { executablePath } from 'puppeteer';

const setup = async () => {
  /* Load broser & DeepL Page */

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    executablePath: executablePath(),
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  page.setDefaultTimeout(10000);

  await page.goto('https://www.deepl.com/en/translator#en/de/', {
    waitUntil: 'networkidle2',
  });

  return { page, browser };
};

export default setup;
