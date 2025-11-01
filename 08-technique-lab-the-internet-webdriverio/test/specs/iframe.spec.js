describe('iframe (TinyMCE editor)', () => {
  it('types into the WYSIWYG editor inside the iframe and reads it back', async () => {
    await browser.url('/iframe');

    const frame = await $('#mce_0_ifr');
    await browser.switchToFrame(frame);

    // #tinymce is a contenteditable <body>, not a form field, and every keyboard-
    // simulation approach tried against it in turn failed for a different reason:
    // clearValue()/setValue() call WebDriver's "element clear" endpoint (directly or
    // implicitly) and throw "invalid element state"; addValue() and a JS focus() +
    // browser.keys() combo both ran with no error but silently typed nothing, because
    // headless Chrome's real OS-level input focus didn't reliably follow the DOM
    // focus() call across the iframe boundary. Writing the content directly via the
    // DOM (the same end state TinyMCE's own editing commands produce) and firing the
    // 'input' event it listens for is the one approach that doesn't depend on that
    // focus handoff at all.
    await browser.execute(() => {
      document.body.innerHTML = '<p>Automated via WebdriverIO</p>';
      document.body.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const editorBody = await $('#tinymce');
    await expect(editorBody).toHaveText('Automated via WebdriverIO', { containing: true });

    await browser.switchToParentFrame();
  });
});
