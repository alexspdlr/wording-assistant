import { Page } from 'puppeteer';

/**
 *
 *  Resets the DeepL page by executing the following steps:
 *
 *    1. Generate a clean setup by reloading the page
 *    2. Wait until the page is loaded
 *
 * @param page
 * @param browser
 */

const resetPage = async (page: Page) => {
  // Generate a clean setup by reloading the page
  await page.goto('about:blank');
  await page.goto('https://www.deepl.com/en/translator#en/de/');

  // Wait until the page is loaded
  await page.waitForSelector('#source-dummydiv');
};

export default resetPage;
