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
      chainWebpack: (config) => {
        config.module
          .rule('mjs')
          .test(/\.mjs$/)
          .type('javascript/auto')
          .include.add(/node_modules/)
          .end()
      },
    },
    argv
  )
  return config
}
