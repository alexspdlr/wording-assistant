import { Browser, Page } from 'puppeteer';

const resetPage = async (page: Page, browser: Browser) => {
  try {
    // Generate clean setup by reloading page
    await page.goto('about:blank');
    await page.goto('https://www.deepl.com/en/translator#en/de/');

    // Wait until page is loaded
    await page.waitForSelector('#source-dummydiv');
  } catch (error) {
    console.log('ERROR :', error);
    browser.close();
    return;
  }
};

export default resetPage;
