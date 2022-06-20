import isJsonObject from '../utils/isJsonObject.js';

const selectRephrasingOption = async (req, res, page) => {
  const selectedOption = req.body.selectedOption;

  /* Store text before selecting option */
  const outputBeforeSelection = await page.$eval(
    '#target-dummydiv',
    (div) => div.innerHTML
  );

  console.log('outputBeforeSelection: ', outputBeforeSelection);

  /* Find index of selected option */

  const selectedOptionIndex = await page.evaluate((selectedOption) => {
    const alternativesPopover = document.querySelector(
      '[dl-test=translator-target-alternatives-popup]'
    );
    return Array.from(alternativesPopover.getElementsByTagName('li')).findIndex(
      (option) => option.innerHTML === selectedOption
    );
  }, selectedOption);

  /* Focus selected option & press enter */
  for (const i of [...Array(selectedOptionIndex + 1).keys()]) {
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
        console.log(
          '------------------------------------------------------------------'
        );
        console.log(
          'response.request().postData(): ',
          response.request().postData()
        );

        if (!isJsonObject(response.request().postData())) {
          console.log('Body is not a JSON Object');
        } else {
          console.log(
            'JSON.parse(response.request().postData()): ',
            JSON.parse(response.request().postData())
          );

          if (JSON.parse(response.request().postData()).params) {
            console.log(
              'JSON.parse(response.request().postData()).params: ',
              JSON.parse(response.request().postData()).params
            );
            console.log(
              'JSON.parse(response.request().postData()).params.jobs: ',
              JSON.parse(response.request().postData()).params.jobs
            );

            console.log(
              'JSON.parse(response.request().postData()).params.jobs[kind=default]: ',
              JSON.parse(response.request().postData()).params.jobs.some(
                (job) => job.kind === 'default'
              )
            );
          } else {
            console.log("postData doesnt include attribute 'params'");
          }
        }

        return (
          response.request().postData() &&
          isJsonObject(response.request().postData()) &&
          JSON.parse(response.request().postData()) &&
          ((JSON.parse(response.request().postData()).params &&
            JSON.parse(response.request().postData()).params.jobs.some(
              (job) => job.kind === 'default'
            )) ||
            JSON.parse(response.request().postData()).clientExperiments)
        );
      },
      { timeout: 5000 }
    );
  } catch (e) {
    /* Result did not change after 5 seconds */
    console.log('target did not change after 5 seconds');
    console.log('error: ', e);
  }

  /* Store rephrasing result */
  const rephrasingResult = await page.$eval(
    '#target-dummydiv',
    (div) => div.innerHTML
  );

  res.json({
    rephrasingResult: rephrasingResult,
  });
};

export default selectRephrasingOption;
