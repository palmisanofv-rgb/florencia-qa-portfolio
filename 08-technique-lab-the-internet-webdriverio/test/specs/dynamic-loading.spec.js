describe('Dynamic Loading', () => {
  it('waits for the element to actually exist instead of a fixed sleep', async () => {
    await browser.url('/dynamic_loading/1');

    await $('#start button').click();

    // Explicit wait on the real condition (avoids both flakiness and over-long fixed sleeps).
    const finishText = await $('#finish');
    await finishText.waitForDisplayed({ timeout: 10000 });

    await expect(finishText).toHaveText('Hello World!');
  });
});
