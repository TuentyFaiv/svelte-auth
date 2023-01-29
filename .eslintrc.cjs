module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ["airbnb-base", "airbnb-typescript/base", 'plugin:@typescript-eslint/recommended'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		project: "./tsconfig.json"
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		"import/extensions": 0,
		"import/no-extraneous-dependencies": 0,
		"import/no-unresolved": 0,
		"import/prefer-default-export": 0,
		"linebreak-style": 0,
		"quotes": "off",
		"@typescript-eslint/quotes": [
			"error",
			"double"
		],
		"comma-dangle": "off",
		"@typescript-eslint/comma-dangle": [
			"error",
			"never"
		],
		"max-len": [
			"error",
			{
				"code": 130
			}
		],
		"dot-notation": "off",
		"@typescript-eslint/dot-notation": 0,
		"padded-blocks": 0,
		"lines-between-class-members": "off",
		"@typescript-eslint/lines-between-class-members": [
			"error",
			"always",
			{
				"exceptAfterSingleLine": true
			}
		],
		"@typescript-eslint/naming-convention": [
			"error",
			{
				"selector": "variable",
				"format": ["camelCase", "UPPER_CASE", "snake_case"],
			}
		],
		"object-shorthand": 0,
		"object-curly-newline": 0,
		"no-useless-return": 0,
		"no-case-declarations": 0,
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": 1,
		"no-debugger": 0,
		"no-plusplus": 0,
		"no-tabs": ["error", { allowIndentationTabs: true }]
	}
};