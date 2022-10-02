import { Browser, Page } from 'puppeteer';
import delay from '../utils/delay';
import resetPage from './resetPage';

const selectText = async (inputText: string, page: Page, browser: Browser) => {
  try {
    const clienSourceInput = inputText;

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

    // Store translation result
    const translationResult = await page.$eval(
      '#target-dummydiv',
      (div) => div.innerHTML
    );

    // Click swap languages button
    await page.$eval('button.lmt__language_container_switch', (button) => {
      const buttonTyped = button as HTMLButtonElement | null;

      buttonTyped?.click();
    });

    // Wait until languages are swapped
    if (translationResult.trim() !== clienSourceInput.trim()) {
      await page.waitForFunction(
        (translationResult) => {
          const translatorSourceInputValue =
            document.querySelector('#target-dummydiv')?.innerHTML;

          return (
            translatorSourceInputValue !== translationResult &&
            translatorSourceInputValue !== '\r\n'
          );
        },
        {},
        translationResult
      );
    } else {
      await page.waitForFunction(
        () => {
          const translatorSourceInputValue =
            document.querySelector('#target-dummydiv')?.innerHTML;

          return translatorSourceInputValue !== '\r\n';
        },
        {},
        translationResult
      );
    }

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

    console.log('client input: ', clienSourceInput);

    console.log('rephrasing result: ', result);

    // Tab into text area of rephrasing base
    const textResultsDisplayed =
      (await page.$('[dl-test=translator-target-result-as-text-container]')) !==
      null;

    //const numberOfTabs = textResultsDisplayed ? 5 : 6;
    const numberOfTabs = 5;
    for (const i of [...Array(numberOfTabs).keys()]) {
      await page.keyboard.press('Tab');
    }

    return result as string;
  } catch (error) {
    console.log('ERROR :', error);
    browser.close();
    return;
  }
};

export default selectText;
