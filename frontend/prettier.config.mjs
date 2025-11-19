export default {
  singleQuote: true,
  semi: true,
  jsxSingleQuote: false,
  bracketSpacing: true,
  trailingComma: 'all',
  printWidth: 90,
  bracketSameLine: false,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  proseWrap: 'always',
  htmlWhitespaceSensitivity: 'css',
  quoteProps: 'as-needed',

  plugins: ['prettier-plugin-tailwindcss'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript'
      }
    },
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 80,
        singleQuote: false
      }
    }
  ]
};