const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// require('dotenv').config();

module.exports = {
  target: 'serverless',
  compress: true,
  poweredByHeader: false,
  webpack: config => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    return config;
  },
  // env: {},
};
