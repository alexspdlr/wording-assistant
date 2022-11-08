import waitUntil from 'async-wait-until';
import { Console } from 'console';
import { decode } from 'html-entities';
import { Page } from 'puppeteer';
import { PuppeteerResponse } from '../types';
import delay from '../utils/delay';

const moveCursor = async (
  page: Page,
  textAreaSelector: string,
  targetIndex: number
): Promise<PuppeteerResponse> => {
  try {
    await page.waitForSelector(textAreaSelector);

    const customTarget = targetIndex;

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

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');

    /* Wait until popover is rendered and filled with alternatives */

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

    /* Store alternatives */

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
        location: 'moveCursor',
        message: String(error),
      },
    };
  }
};

export default moveCursor;
