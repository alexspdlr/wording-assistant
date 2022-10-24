import { Browser, Page } from 'puppeteer';
import { PuppeteerError, PuppeteerResponse } from '../types';
import resetPage from './resetPage';

const selectText = async (
  originalText: string,
  page: Page,
  browser: Browser
): Promise<PuppeteerResponse> => {
  const clienSourceInput = originalText;
  try {
    if (page.url() !== 'https://www.deepl.com/en/translator#en/de/') {
      await resetPage(page, browser);
    }

    // Paste client input into translator source
    await page.evaluate((clienSourceInput) => {
      const translatorSourceInput = document.querySelector(
        '[dl-test=translator-source-input]'
      ) as HTMLTextAreaElement | null;

      if (translatorSourceInput) translatorSourceInput.value = clienSourceInput;
    }, clienSourceInput);

    // Tab out and back into translator input field to trigger translation
    await page.keyboard.press('Tab');
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await page.keyboard.up('ShiftLeft');

    // Wait until translation is finished
    await page.waitForFunction(
      () => document.querySelector('#target-dummydiv')?.innerHTML !== '\r\n'
    );

    // Click swap languages button
    await page.$eval('button.lmt__language_container_switch', (button) => {
      const buttonTyped = button as HTMLButtonElement | null;

      buttonTyped?.click();
    });

    // Wait until languages are swapped

    await page.waitForFunction(() => {
      // wait until target dummydiv . lang .startsWith en
      const translatorSourceInput = document.querySelector('#target-dummydiv');

      return (
        translatorSourceInput &&
        translatorSourceInput.getAttribute('lang')?.startsWith('en') &&
        translatorSourceInput.innerHTML !== '\r\n'
      );
    }, {});

    // Paste client input into translator target
    await page.evaluate((clienSourceInput) => {
      const translatorTargetInput = document.querySelector(
        '[dl-test=translator-target-input]'
      ) as HTMLTextAreaElement | null;

      if (translatorTargetInput) {
        translatorTargetInput.value = clienSourceInput;
      }
    }, clienSourceInput);

    // move cursor to trigger dummy div update
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');

    // Store rephrasing result
    const result = await page.$eval(
      '[dl-test=translator-target-input]',
      (textArea) => (textArea as HTMLTextAreaElement).value
    );

    //const numberOfTabs = textResultsDisplayed ? 5 : 6;
    const numberOfTabs = 5;
    for (const i of [...Array(numberOfTabs).keys()]) {
      await page.keyboard.press('Tab');
    }

    return {
      type: 'response',
      data: {
        result: result as string,
      },
    };
  } catch (error) {
    return {
      type: 'error',
      data: {
        location: 'selectText',
        message: String(error),
      },
    };
  }
};

export default selectText;
