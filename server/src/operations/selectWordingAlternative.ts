import { Page } from 'puppeteer';
import isJSON from '../utils/isJSON';

const selectWordingAlternative = async (
  selectedAlternativeIndex: number,
  page: Page
) => {
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
  } catch (e) {
    /* Result did not change after 5 seconds */
    console.log('Timeout: Rephrasing result not available after 5 seconds');
  }

  /* Store rephrasing result */
  const rephrasingResult = await page.$eval(
    '#target-dummydiv',
    (div) => div.innerHTML
  );

  return rephrasingResult;
};

export default selectWordingAlternative;
