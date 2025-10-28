describe('JavaScript Alerts', () => {
  it('accepts a native confirm() dialog', async () => {
    await browser.url('/javascript_alerts');

    await $('button=Click for JS Confirm').click();
    await browser.acceptAlert();

    await expect($('#result')).toHaveText('You clicked: Ok');
  });

  it('dismisses a native confirm() dialog', async () => {
    await browser.url('/javascript_alerts');

    await $('button=Click for JS Confirm').click();
    await browser.dismissAlert();

    await expect($('#result')).toHaveText('You clicked: Cancel');
  });

  it('sends text into a native prompt() dialog', async () => {
    await browser.url('/javascript_alerts');

    await $('button=Click for JS Prompt').click();
    await browser.sendAlertText('Florencia');
    await browser.acceptAlert();

    await expect($('#result')).toHaveText('You entered: Florencia');
  });
});
