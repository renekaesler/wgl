module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'wgl.min.js',
    library: 'Wgl',
    libraryExport: 'default',
  }
};