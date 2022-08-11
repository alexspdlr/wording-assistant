const generateRephrasingBase = async (req, res, page) => {
  const clienSourceInput = req.body.input;

  // Generate clean setup by reloading page & deleting cache
  await page.goto('https://www.deepl.com/translator');

  // Wait until page is loaded
  await page.waitForSelector('#source-dummydiv');

  // Paste client input into translator input
  await page.evaluate((clienSourceInput) => {
    const translatorSourceInput = document.querySelector(
      '[dl-test=translator-source-input]'
    );
    translatorSourceInput.value = clienSourceInput;
  }, clienSourceInput);

  // Tab out and back into translator input field to trigger translation
  await page.keyboard.press('Tab');
  await page.keyboard.down('ShiftLeft');
  await page.keyboard.press('Tab');
  await page.keyboard.up('ShiftLeft');

  // Wait until translation is finished
  await page.waitForFunction(
    () => document.querySelector('#target-dummydiv').innerHTML !== '\r\n'
  );

  // Store translation result
  const translationResult = await page.$eval(
    '#target-dummydiv',
    (div) => div.innerHTML
  );

  // Click swap languages button
  await page.$eval('button.lmt__language_container_switch', (button) =>
    button.click()
  );

  // Wait until languages are swapped
  await page.waitForFunction(
    (translationResult) => {
      const translatorSourceInputValue =
        document.querySelector('#target-dummydiv').innerHTML;
      return (
        translatorSourceInputValue !== translationResult &&
        translatorSourceInputValue !== '\r\n'
      );
    },
    {},
    translationResult
  );

  // Store translation result
  const result = await page.$eval('#target-dummydiv', (div) => div.innerHTML);

  // Tab into text area of rephrasing base
  const textResultsDisplayed =
    (await page.$('[dl-test=translator-target-result-as-text-container]')) !==
    null;
  const numberOfTabs = textResultsDisplayed ? 6 : 7;
  for (const i of [...Array(numberOfTabs).keys()]) {
    await page.keyboard.press('Tab');
  }

  res.json({
    result: result,
  });
};

export default generateRephrasingBase;
