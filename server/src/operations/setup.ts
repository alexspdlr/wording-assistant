import puppeteer from 'puppeteer';

const setup = async () => {
  /* Load broser & DeepL Page */
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultTimeout(8000);
  await page.goto('https://www.deepl.com/translator');
  /* Accept necessary cookies */
  await page.evaluate(() => {
    const targetEl: HTMLElement | null = document.querySelector(
      '[dl-test=cookie-banner-strict-accept-selected]'
    );
    if (targetEl) targetEl.click();
  });
  return { page, browser };
};
export default setup;
