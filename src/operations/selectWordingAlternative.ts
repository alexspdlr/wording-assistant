import { decode } from 'html-entities';
import { Page } from 'puppeteer';
import { PuppeteerResponse } from '../types';

/**
 *
 *  Simulates the client-action-event "selectWordingAlternative" by executing the following steps on the DeepL Website using Puppeter:
 *
 *    1. Check wether the selected alternative has the correct value
 *    2. Select the wording-alternative chosen by the client
 *    3. Return the newly reworded text
 *
 * @param selectedAlternativeIndex
 * @param selectedAlternativeValue
 * @param page
 * @returns the newly reworded text
 */

const selectWordingAlternative = async (
  selectedAlternativeIndex: number,
  selectedAlternativeValue: string,
  page: Page
): Promise<PuppeteerResponse> => {
  try {
    // Check whether the selected alternative has the correct value
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

    // Focus selected alternative & press "Enter"
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const i of [...Array(selectedAlternativeIndex + 1).keys()]) {
      await page.keyboard.press('ArrowDown');
    }
    await page.keyboard.press('Enter');

    // Wait until the alternative popover is closed
    await page.waitForFunction(() => {
      return (
        document.querySelector(
          '[dl-test=translator-target-alternatives-popup]'
        ) === null
      );
    });

    // Wait until the request for rphrasing is followed by a response (from DeepL)
    try {
      await page.waitForResponse(
        async (response) => {
          console.log('RESPONSE: ', response);

          let responseJson;

          try {
            responseJson = await response.json();
          } catch (error) {
            return false;
          }

          if (!responseJson) {
            return false;
          }

          const result =
            responseJson.result.translations[0].beams[0].sentences[0].text;
          return response.ok() && result;
        },
        {
          timeout: 8000,
        }
      );
    } catch (error) {
      console.log(error);
    }

    // Store the rephrasing result
    const rephrasingResult = await page.$eval(
      '#target-dummydiv',
      (div) => div.innerHTML
    );

    // Return the rephrasing result
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
