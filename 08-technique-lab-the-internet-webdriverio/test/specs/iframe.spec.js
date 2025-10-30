describe('iframe (TinyMCE editor)', () => {
  it('types into the WYSIWYG editor inside the iframe and reads it back', async () => {
    await browser.url('/iframe');

    const frame = await $('#mce_0_ifr');
    await browser.switchToFrame(frame);

    // #tinymce is a contenteditable <body>, not a form field. clearValue() calls
    // WebDriver's "element clear" endpoint (form-fields only) and throws "invalid
    // element state" here; an explicit click() before typing also fails ("element
    // click intercepted") because the click point is computed against the outer
    // document rather than the frame we just switched into. setValue() alone
    // handles focusing internally without a separate mouse click, so it's the one
    // that actually works for a contenteditable element inside an iframe.
    const editorBody = await $('#tinymce');
    await editorBody.setValue('Automated via WebdriverIO');

    await expect(editorBody).toHaveText('Automated via WebdriverIO', { containing: true });

    await browser.switchToParentFrame();
  });
});
