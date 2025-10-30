describe('iframe (TinyMCE editor)', () => {
  it('types into the WYSIWYG editor inside the iframe and reads it back', async () => {
    await browser.url('/iframe');

    const frame = await $('#mce_0_ifr');
    await browser.switchToFrame(frame);

    // #tinymce is a contenteditable <body>, not a form field - WebDriver's "element
    // clear" endpoint only supports actual input/textarea elements and throws
    // "invalid element state" here, so clear it by selecting all text instead.
    const editorBody = await $('#tinymce');
    await editorBody.click();
    await browser.keys(['Control', 'a']);
    await editorBody.setValue('Automated via WebdriverIO');

    await expect(editorBody).toHaveText('Automated via WebdriverIO', { containing: true });

    await browser.switchToParentFrame();
  });
});
