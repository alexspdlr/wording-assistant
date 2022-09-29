import { Browser, Page } from 'puppeteer';
import resetPage from './resetPage';

const selectText = async (inputText: string, page: Page, browser: Browser) => {
  try {
    const clienSourceInput = inputText;

    if (page.url() !== 'https://www.deepl.com/en/translator#en/de/') {
      await resetPage(page, browser);
    }

    // Paste client input into translator input
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

    // Store translation result
    const result = await page.$eval('#target-dummydiv', (div) => div.innerHTML);

    // Tab into text area of rephrasing base
    const textResultsDisplayed =
      (await page.$('[dl-test=translator-target-result-as-text-container]')) !==
      null;
    const numberOfTabs = textResultsDisplayed ? 6 : 7;
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
