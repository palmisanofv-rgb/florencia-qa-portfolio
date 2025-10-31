describe('iframe (TinyMCE editor)', () => {
  it('types into the WYSIWYG editor inside the iframe and reads it back', async () => {
    await browser.url('/iframe');

    const frame = await $('#mce_0_ifr');
    await browser.switchToFrame(frame);

    // #tinymce is a contenteditable <body>, not a form field, which rules out every
    // WebdriverIO command that clears before typing: clearValue() calls WebDriver's
    // "element clear" endpoint directly (form-fields only); setValue() does an
    // implicit clear-then-type internally, so it hits the exact same "invalid
    // element state" error. addValue() is the one command in this family that just
    // sends keystrokes without clearing first, which is what a contenteditable
    // element inside an iframe actually needs.
    const editorBody = await $('#tinymce');
    await editorBody.addValue('Automated via WebdriverIO');

    await expect(editorBody).toHaveText('Automated via WebdriverIO', { containing: true });

    await browser.switchToParentFrame();
  });
});
