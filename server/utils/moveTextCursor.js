import repeat from './repeat.js';

const moveTextCursor = async (page, textAreaSelector, target) => {
  await page.waitForSelector(textAreaSelector);
  const stringLength = await page.evaluate(async (textAreaSelector) => {
    return document.querySelector(textAreaSelector).value.length;
  }, textAreaSelector);
  const currentCursorPoisition = await page.evaluate(
    async (textAreaSelector) => {
      return document.querySelector(textAreaSelector).selectionStart;
    },
    textAreaSelector
  );

  /*
        if(target === 'start'){
            // Move text cursor to beginning of text area 
            for (const i of [...Array(-currentCursorPoisition).keys()]) {
              await page.keyboard.press('ArrowLeft'); 
            }
            return;
        }
        */

  if (target === 'end') {
    /* Move text cursor to end of text area */
    const difference = stringLength - currentCursorPoisition;

    for (const i of [...Array(difference).keys()]) {
      await page.keyboard.press('ArrowRight');
    }

    // return await repeat(-difference, page.keyboard.press('ArrowRight'));
    return;
  }
  /*
      const difference = target - currentCursorPoisition;

      if (difference >= 0) {
        await repeat(difference, page.keyboard.press('ArrowRight'));
        return;
      } else {
        await repeat(difference, page.keyboard.press('ArrowLeft'));
        return;
      }
      */
};

export default moveTextCursor;
