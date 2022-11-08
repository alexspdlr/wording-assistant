import { decode } from 'html-entities';
import { Page } from 'puppeteer';
import { PuppeteerResponse } from '../types';

/**
 *
 *  Simulates the client-action-event "moveCaret" by executing the following steps on the DeepL Website using Puppeter:
 *
 *    1. Move the caret to the position specified by the client
 *    2. Wait until rephrasing alternatives are displayed
 *    3. Return the list of rephrasing alternatives
 *
 * @param page
 * @param textAreaSelector
 * @param targetIndex
 * @returns rephrasingAlternatives
 */

const moveCaret = async (
  page: Page,
  textAreaSelector: string,
  targetIndex: number
): Promise<PuppeteerResponse> => {
  try {
    await page.waitForSelector(textAreaSelector);

    const customTarget = targetIndex;

    // Move the caret to the position specified by the client
    await page.evaluate(
      async (textAreaSelector, customTarget) => {
        const textAreaEl = document.querySelector(
          textAreaSelector
        ) as HTMLTextAreaElement | null;

        if (textAreaEl) {
          textAreaEl.selectionStart = customTarget;
          textAreaEl.selectionEnd = customTarget;
        }
        return;
      },
      textAreaSelector,
      customTarget
    );

    // Move the caret to trigger the DeepL NLP engine
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');

    // Wait until the alternatives are displayed
    try {
      await page.waitForSelector(
        '[dl-test=translator-target-alternatives-popup]',
        { timeout: 500 }
      );

      await page.waitForFunction(
        () => {
          const targetEl = document.querySelector(
            '[dl-test=translator-target-alternatives-popup]'
          ) as HTMLTextAreaElement | null;
          const numberOfResults = targetEl
            ? Array.from(targetEl.getElementsByTagName('li')).length
            : 0;
          return numberOfResults > 1;
        },
        { timeout: 5000 }
      );
    } catch (error) {
      console.log(error);
    }

    // Store alternatives
    const rephrasingAlternatives = await page.evaluate(() => {
      const popover = document.querySelector(
        '[dl-test=translator-target-alternatives-popup]'
      );
      if (popover) {
        return Array.from(popover.getElementsByTagName('li')).map(
          (item) => item.innerHTML
        );
      }
      return [];
    });

    // Return alternatives
    return {
      type: 'response',
      data: {
        rephrasingAlternatives: rephrasingAlternatives.map(
          (alternative: string) => decode(alternative)
        ),
      },
    };
  } catch (error) {
    return {
      type: 'error',
      data: {
        location: 'moveCaret',
        message: String(error),
      },
    };
  }
};

export default moveCaret;
