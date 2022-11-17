import puppeteer from 'puppeteer';
import { executablePath } from 'puppeteer';

/**
 *
 *  Sets up puppeteer by executing the following steps:
 *
 *    1. Launch the puppeteer browser
 *    2. Open a new page
 *    3. Navigate to https://www.deepl.com/en/translator#en/de/
 *
 * @returns the puppeteer Page & Browser objects
 */
const setup = async () => {
  // Launch the puppeteer browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    executablePath: executablePath(),
  });

  //  Open a new page
  const page = await browser.newPage();

  // Specify the viewport size
  await page.setViewport({ width: 1920, height: 1080 });

  page.setDefaultTimeout(10000);

  // Navigate to DeepL
  await page.goto('https://www.deepl.com/en/translator#en/de/', {
    waitUntil: 'networkidle2',
  });

  // Return Page & Browser objects
  return { page, browser };
};

export default setup;
