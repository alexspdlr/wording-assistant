import waitUntil from 'async-wait-until';
import { Page } from 'puppeteer';
import delay from '../utils/delay';
import puppeteer_move_cursor from './moveCursor';

const updateTargetText = async (
  page: Page,
  textAreaSelector: string,
  targetIndex: number,
  newTargetText: string
): Promise<string[]> => {
  await page.waitForSelector(textAreaSelector);

  // paste new text into target field
  await page.evaluate((newTargetText) => {
    const translatorTargetInput = document.querySelector(
      '[dl-test=translator-target-input]'
    ) as HTMLTextAreaElement | null;

    if (translatorTargetInput) {
      translatorTargetInput.value = newTargetText;
    }
  }, newTargetText);

  // move cursor to trigger dummy div update
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowRight');

  // move cursor
  const rephrasingOptions = await puppeteer_move_cursor(
    page,
    '[dl-test=translator-target-input]',
    targetIndex
  );

  console.log('REPHRASING OPTIONS: ', rephrasingOptions);

  return rephrasingOptions;
};

export default updateTargetText;
