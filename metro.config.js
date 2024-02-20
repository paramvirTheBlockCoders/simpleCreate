const path = require('path');

module.exports = {
  resolver: {
    assetExts: ['jpeg', 'jpg', 'png', 'gif','webp'], // Add any additional asset extensions you're using
  },
  watchFolders: [
    // Remove the non-existent directory entry
    // path.resolve(__dirname, './path/to/other/folder'),
  ],
};
