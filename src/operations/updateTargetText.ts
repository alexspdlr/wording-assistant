import { Page } from 'puppeteer';
import { PuppeteerResponse } from '../types';

const updateTargetText = async (
  page: Page,
  textAreaSelector: string,
  newTargetText: string
): Promise<PuppeteerResponse> => {
  try {
    await page.waitForSelector(textAreaSelector);

    // paste new text into target field
    await page.evaluate((newTargetText) => {
      const translatorTargetInput = document.querySelector(
        '[dl-test=translator-target-input]'
      ) as HTMLTextAreaElement | null;

      if (
        translatorTargetInput &&
        translatorTargetInput.value !== newTargetText
      ) {
        translatorTargetInput.value = newTargetText;
      }
    }, newTargetText);

    // move cursor to trigger dummy div update
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');

    /*
    // move cursor
    const rephrasingOptions = await puppeteer_move_cursor(
      page,
      '[dl-test=translator-target-input]',
      targetIndex
    );

    */

    return {
      type: 'response',
      data: {
        targetText: newTargetText,
      },
    };
  } catch (error) {
    return {
      type: 'error',
      data: {
        location: 'updateTargetText',
        message: String(error),
      },
    };
  }
};

export default updateTargetText;
