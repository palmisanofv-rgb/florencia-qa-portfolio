describe('Shadow DOM', () => {
  it('pierces the shadow boundary to read the projected list items', async () => {
    await browser.url('/shadowdom');

    // Two <my-paragraph> custom elements exist on this page; the second one projects
    // a <ul><li> list via a <slot>. Slotted content stays in the *light* DOM (it's
    // just visually relocated into the shadow tree) - shadow$$ only reaches elements
    // that live *inside* the shadow root itself, so a plain $$ on the host is what
    // actually finds the projected <li> elements here, not shadow$$.
    const hosts = await $$('my-paragraph');
    const items = await hosts[1].$$('li');

    expect(items).toHaveLength(2);

    const firstItemText = await items[0].getText();
    expect(firstItemText).toBe("Let's have some different text!");
  });
});
