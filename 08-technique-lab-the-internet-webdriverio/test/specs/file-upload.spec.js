const path = require('path');

describe('File Upload', () => {
  it('uploads a local file and confirms the server echoes its name', async () => {
    await browser.url('/upload');

    const filePath = path.join(__dirname, '..', 'fixtures', 'sample.txt');
    const remoteFilePath = await browser.uploadFile(filePath);

    const fileInput = await $('#file-upload');
    await fileInput.setValue(remoteFilePath);
    await $('#file-submit').click();

    await expect($('#uploaded-files')).toHaveText('sample.txt');
  });
});
