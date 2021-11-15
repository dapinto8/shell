const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, 'tsconfig.json'), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: 'shell',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        // dashboard: 'dashboard@//localhost:5100/remoteEntry.js',
      },
      shared: share({
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
    new BundleAnalyzerPlugin()
  ],
};
