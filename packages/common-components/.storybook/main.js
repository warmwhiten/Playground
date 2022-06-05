module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  typescript: {
    check: true
  },
  features: {
    babelModeV7: true
  },
  babel: (config) => {
    config.presets.push(require.resolve('@emotion/babel-preset-css-prop'))
    return config
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader')
    })
    return config
  }
}
