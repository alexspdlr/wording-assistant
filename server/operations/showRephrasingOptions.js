const showRephrasingOptions = async (req, res, page) => {
  const targetWordWordIndex = req.body.targetWordIndex;

  /* Store translation result */
  const rephrasingBase = await page.$eval(
    '#target-dummydiv',
    (div) => div.innerHTML
  );

  console.log('targetWordIndex: ', targetWordWordIndex);
  console.log('targetWord: ', rephrasingBase.split(' ')[targetWordWordIndex]);

  /* Tab into text area of rephrasing base */
  for (const i of [...Array(6).keys()]) {
    await page.keyboard.press('Tab');
  }

  /* Position text cursor at first character of target word */
  const characterLength = rephrasingBase.length;
  const targetWordCharacterIndex = rephrasingBase
    .split(' ')
    .slice(0, targetWordWordIndex)
    .join(' ').length;
  const characterDifference = characterLength - targetWordCharacterIndex - 3;
  for (const i of [...Array(characterDifference).keys()]) {
    await page.keyboard.press('ArrowLeft');
  }

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
  console.log('rephrasingAlternatives: ', rephrasingAlternatives);

  res.json({
    rephrasingAlternatives: rephrasingAlternatives,
  });
};

export default showRephrasingOptions;
