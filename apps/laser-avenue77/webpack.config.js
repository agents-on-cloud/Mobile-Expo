const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { withNxWebpack } = require('@nrwl/expo');

module.exports = async function (env, argv) {
  let config = await createExpoWebpackConfigAsync(env, argv);
  config = await withNxWebpack(config);

  // You can override the config here, for example:
  // config.resolve.alias = {
  //   ...config.resolve.alias,
  //   react: path.resolve('../../node_modules/react'),
  // };

  return config;
};


// const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// const { withNxWebpack } = require('@nrwl/expo');
// // Expo CLI will await this method so you can optionally return a promise.
// module.exports = async function(env, argv) {

//   const config = await createExpoWebpackConfigAsync(env, argv);
//   config = await withNxWebpack(config);
//   // If you want to add a new alias to the config.
//   config.resolve.alias['moduleA'] = 'moduleB';

//   // Maybe you want to turn off compression in dev mode.

//   // Finally return the new config for the CLI to use.
//   return config;
// };
