import { Page } from 'puppeteer';
import { PuppeteerResponse } from '../types';
import isJSON from '../utils/isJSON';
import { decode } from 'html-entities';

const selectWordingAlternative = async (
  selectedAlternativeIndex: number,
  selectedAlternativeValue: string,
  page: Page
): Promise<PuppeteerResponse> => {
  try {
    /* Check if selected option has the correct value -> throw error if not */

    console.log('**** selectedAlternativeIndex', selectedAlternativeIndex);
    console.log('**** selectedAlternativeValue', selectedAlternativeValue);

    const targetValue: string = await page.evaluate(
      (selectedAlternativeIndex) => {
        const popover = document.querySelector(
          '[dl-test=translator-target-alternatives-popup]'
        );

        if (popover) {
          console.log(
            '**** popover li elements',
            Array.from(popover.getElementsByTagName('li'))
          );

          return Array.from(popover.getElementsByTagName('li'))[
            selectedAlternativeIndex
          ].innerHTML;
        }
        return '';
      },
      selectedAlternativeIndex
    );

    const isCorrectTarget: boolean =
      decode(targetValue) === selectedAlternativeValue;

    if (!isCorrectTarget) {
      throw 'selected wording alternative not found';
    }

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

    try {
      await page.waitForResponse(
        async (response) => {
          return (
            response.request().postData() &&
            isJSON(response.request().postData()) &&
            JSON.parse(response.request().postData() as string) &&
            ((JSON.parse(response.request().postData() as string).params &&
              JSON.parse(response.request().postData() as string).params.jobs &&
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
    } catch (error) {
      console.log(error);
    }

    /* Store rephrasing result */
    const rephrasingResult = await page.$eval(
      '#target-dummydiv',
      (div) => div.innerHTML
    );

    return {
      type: 'response',
      data: {
        rephrasingResult: decode(rephrasingResult),
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
