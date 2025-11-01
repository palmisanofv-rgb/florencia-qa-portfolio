describe('iframe (TinyMCE editor)', () => {
  it('types into the WYSIWYG editor inside the iframe and reads it back', async () => {
    await browser.url('/iframe');

    const frame = await $('#mce_0_ifr');
    await browser.switchToFrame(frame);

    // #tinymce is a contenteditable <body>, not a form field, which ruled out every
    // element-level typing command in turn: clearValue() and setValue() both call
    // WebDriver's "element clear" endpoint (directly or implicitly) and throw
    // "invalid element state"; addValue() doesn't error, but silently no-ops instead
    // of actually typing, because it never establishes real keyboard focus on this
    // element. Focusing via JS and then sending raw keys at the browser level (which
    // types into whatever already has focus, no element/click-point resolution
    // involved) is what actually works for a contenteditable editor inside an iframe.
    await browser.execute(() => document.body.focus());
    await browser.keys('Automated via WebdriverIO');

    const editorBody = await $('#tinymce');
    await expect(editorBody).toHaveText('Automated via WebdriverIO', { containing: true });

    await browser.switchToParentFrame();
  });
});
