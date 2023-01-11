const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          //'@ceramicnetwork',
          'did-jwt',
          //'@didtools',
          //'dids',
          //'mapmoize',
          //'rpc-utils',
        ],
      },
    },
    argv
  )
  return config
}
