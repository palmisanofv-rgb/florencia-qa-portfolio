describe('iframe (TinyMCE editor)', () => {
  it('types into the WYSIWYG editor inside the iframe and reads it back', async () => {
    await browser.url('/iframe');

    const frame = await $('#mce_0_ifr');
    await browser.switchToFrame(frame);

    const editorBody = await $('#tinymce');
    await editorBody.clearValue();
    await editorBody.setValue('Automated via WebdriverIO');

    await expect(editorBody).toHaveText('Automated via WebdriverIO', { containing: true });

    await browser.switchToParentFrame();
  });
});
