import moveTextCursor from '../utils/moveTextCursor.js';

const showRephrasingOptions = async (requestBody, page) => {
  const targetWordWordIndex = requestBody.targetWordIndex;

  /* Store translation result */
  const rephrasingBase = await page.$eval(
    '#target-dummydiv',
    (div) => div.innerHTML
  );
  /* Position text cursor at first character of target word */
  const characterLength = rephrasingBase.length;
  const targetWordCharacterIndex = rephrasingBase
    .split(' ')
    .slice(0, targetWordWordIndex)
    .join(' ').length;

  await moveTextCursor(
    page,
    '[dl-test=translator-target-input]',
    targetWordCharacterIndex
  );

  /* Wait until popover is rendered and filled with alternatives */
  await page.waitForSelector('[dl-test=translator-target-alternatives-popup]');
  await page.waitForFunction(() => {
    const numberOfResults = Array.from(
      document
        .querySelector('[dl-test=translator-target-alternatives-popup]')
        .getElementsByTagName('li')
    ).length;
    return numberOfResults > 1;
  });

  /* Store alternatives */
  const rephrasingAlternatives = await page.$eval(
    '[dl-test=translator-target-alternatives-popup]',
    (popover) =>
      Array.from(popover.getElementsByTagName('li')).map(
        (item) => item.innerHTML
      )
  );
  return {
    rephrasingAlternatives: rephrasingAlternatives,
  };
};

export default showRephrasingOptions;
