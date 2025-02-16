// eslint.config.cjs
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
	{
		files: ['**/*.ts', '**/*.js'],
		ignores: ['node_modules/**', 'dist/**'],
		languageOptions: {
			ecmaVersion: 2018,
			sourceType: 'module',
			parser: typescriptParser,
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
		},
		rules: {
			'@typescript-eslint/no-var-requires': 'off',
			'prefer-const': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
];
