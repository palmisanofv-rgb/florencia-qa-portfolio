describe('Shadow DOM', () => {
  it('pierces the shadow boundary to read the projected list items', async () => {
    await browser.url('/shadowdom');

    // Two <my-paragraph> custom elements exist on this page; the second one projects
    // a <ul><li> list via a slot. shadow$$ pierces the shadow boundary the way a plain
    // CSS selector cannot (the first element only has a plain <span>, no list).
    const hosts = await $$('my-paragraph');
    const items = await hosts[1].shadow$$('li');

    expect(items).toHaveLength(2);

    const firstItemText = await items[0].getText();
    expect(firstItemText).toBe("Let's have some different text!");
  });
});
