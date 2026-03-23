import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
  },
  {
    ignores: [
      'docs/.vitepress/cache',
      'bot/generated',
    ],
  },
)
