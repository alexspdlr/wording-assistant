import { Page } from 'puppeteer';
import { PuppeteerResponse } from '../types';
import resetPage from './resetPage';

/**
 *
 *  Simulates the client-action-event "selectText" by executing the following steps on the DeepL Website using Puppeter:
 *
 *    1. Go to https://www.deepl.com/en/translator#en/de/ if current URL is incorrect
 *    2. Translate the client-selected-text from english to german
 *    3. Swap source and target languages to translate the german result back to english
 *    4. Replace the english target translation with the client-selected-text
 *
 *  The active translation target text now equals the client-selected text.
 *  It can thus be interpreted by DeepL's NLP engine.
 *
 * @param originalText
 * @param page
 * @param browser
 * @returns the active translation target (= originalText)
 */

const selectText = async (
  originalText: string,
  page: Page
): Promise<PuppeteerResponse> => {
  const clienSourceInput = originalText;
  try {
    if (page.url() !== 'https://www.deepl.com/en/translator#en/de/') {
      await resetPage(page);
    }

    // Insert the client input into the translator's source
    await page.evaluate((clienSourceInput) => {
      const translatorSourceInput = document.querySelector(
        '[dl-test=translator-source-input]'
      ) as HTMLTextAreaElement | null;

      if (translatorSourceInput) translatorSourceInput.value = clienSourceInput;
    }, clienSourceInput);

    // Tab out and back into the translator's input field to trigger the translation
    await page.keyboard.press('Tab');
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await page.keyboard.up('ShiftLeft');

    // Wait until the translation is completed
    await page.waitForFunction(
      () => document.querySelector('#target-dummydiv')?.innerHTML !== '\r\n'
    );

    // Click on the "Swap Languages" button
    await page.$eval('button.lmt__language_container_switch', (button) => {
      const buttonTyped = button as HTMLButtonElement | null;

      buttonTyped?.click();
    });

    // Wait until the languages are swapped
    await page.waitForFunction(() => {
      const translatorSourceInput = document.querySelector('#target-dummydiv');

      return (
        translatorSourceInput &&
        translatorSourceInput.getAttribute('lang')?.startsWith('en') &&
        translatorSourceInput.innerHTML !== '\r\n'
      );
    }, {});

    // Insert client input into the translator's target
    await page.evaluate((clienSourceInput) => {
      const translatorTargetInput = document.querySelector(
        '[dl-test=translator-target-input]'
      ) as HTMLTextAreaElement | null;

      if (translatorTargetInput) {
        translatorTargetInput.value = clienSourceInput;
      }
    }, clienSourceInput);

    // Move the caret to trigger an update of the dummy div
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');

    // Store the rephrasing result
    const result = await page.$eval(
      '[dl-test=translator-target-input]',
      (textArea) => (textArea as HTMLTextAreaElement).value
    );

    // Tab into the translator's target
    const numberOfTabs = 5;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
