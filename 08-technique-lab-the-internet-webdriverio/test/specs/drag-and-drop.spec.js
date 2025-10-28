describe('Drag and Drop', () => {
  it('swaps column A and column B after dragging', async () => {
    await browser.url('/drag_and_drop');

    const columnA = await $('#column-a');
    const columnB = await $('#column-b');

    const textABefore = await columnA.getText();
    const textBBefore = await columnB.getText();

    await columnA.dragAndDrop(columnB);

    const textAAfter = await columnA.getText();
    const textBAfter = await columnB.getText();

    // The core assertion: the actual resulting DOM state swapped, not just "the drag didn't throw".
    expect(textAAfter).toBe(textBBefore);
    expect(textBAfter).toBe(textABefore);
  });
});
