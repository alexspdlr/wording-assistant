const moveTextCursor = async (page, textAreaSelector, target) => {
  await page.waitForSelector(textAreaSelector);
  const stringLength = await page.evaluate(async (textAreaSelector) => {
    return document.querySelector(textAreaSelector).value.length;
  }, textAreaSelector);

  if (target === 'end') {
    /* Move text cursor to end of text area */

    await page.evaluate(
      async (textAreaSelector, stringLength) => {
        return (document.querySelector(textAreaSelector).selectionStart =
          stringLength);
      },
      textAreaSelector,
      stringLength
    );

    await page.evaluate(
      async (textAreaSelector, stringLength) => {
        return (document.querySelector(textAreaSelector).selectionEnd =
          stringLength);
      },
      textAreaSelector,
      stringLength
    );
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');

    return;
  }

  const customTarget = target === 0 ? target : target + 1;

  await page.evaluate(
    async (textAreaSelector, customTarget) => {
      return (document.querySelector(textAreaSelector).selectionStart =
        customTarget);
    },
    textAreaSelector,
    customTarget
  );

  await page.evaluate(
    async (textAreaSelector, customTarget) => {
      return (document.querySelector(textAreaSelector).selectionEnd =
        customTarget);
    },
    textAreaSelector,
    customTarget
  );

  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowLeft');
};

export default moveTextCursor;
