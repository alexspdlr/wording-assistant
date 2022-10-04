import { Page } from 'puppeteer';
import { PuppeteerResponse } from '../types';
import isJSON from '../utils/isJSON';

const selectWordingAlternative = async (
  selectedAlternativeIndex: number,
  page: Page
): Promise<PuppeteerResponse> => {
  try {
    /* Focus selected option & press enter */
    for (const i of [...Array(selectedAlternativeIndex + 1).keys()]) {
      await page.keyboard.press('ArrowDown');
    }
    await page.keyboard.press('Enter');

    /* Wait until popover closed */
    await page.waitForFunction(() => {
      return (
        document.querySelector(
          '[dl-test=translator-target-alternatives-popup]'
        ) === null
      );
    });

    /* Wait for preflight */

    /* Wait until the request for rewording is followed by a response (from DeepL) */

    await page.waitForResponse(
      async (response) => {
        return (
          response.request().postData() &&
          isJSON(response.request().postData()) &&
          JSON.parse(response.request().postData() as string) &&
          ((JSON.parse(response.request().postData() as string).params &&
            JSON.parse(
              response.request().postData() as string
            ).params.jobs.some(
              (job: { kind: string }) => job.kind === 'default'
            )) ||
            JSON.parse(response.request().postData() as string)
              .clientExperiments)
        );
      },
      { timeout: 5000 }
    );

    /* Store rephrasing result */
    const rephrasingResult = await page.$eval(
      '#target-dummydiv',
      (div) => div.innerHTML
    );

    return {
      type: 'response',
      data: {
        rephrasingResult,
      },
    };
  } catch (error) {
    return {
      type: 'error',
      data: {
        location: 'selectWordingAlternative',
        message: String(error),
      },
    };
  }
};

export default selectWordingAlternative;
