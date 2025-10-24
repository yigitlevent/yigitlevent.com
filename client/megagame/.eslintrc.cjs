module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	settings: {
		react: {
			version: "detect"
		},
		"import/resolver": {
			"eslint-import-resolver-custom-alias": {
				alias: {
					"@utility": "../../utility/src"
				},
				extensions: [".ts", ".tsx"]
			}
		}
	},
	extends: [
		"eslint:recommended",
		"plugin:import/typescript",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:json/recommended"
	],
	parserOptions: {
		project: ["./tsconfig.json"]
	},
	parser: "@typescript-eslint/parser",
	ignorePatterns: ["node_modules", "dist", "build", "dist", "package.json", "tsconfig.json", "tsconfig.node.json", ".eslintrc.cjs", "vite.config.ts", "**/components_old/**/*.tsx", "**/oldStores/**/*.tsx"],
	plugins: ["import", "react", "react-hooks", "react-refresh", "@typescript-eslint", "json"],
	rules: {
		"json/*": ["error", "allowComments"],

		"import/named": "off",
		"import/newline-after-import": ["error", { count: 2 }],
		"import/no-default-export": "error",
		"import/no-unresolved": ["error", { ignore: ['\\.woff$'] }],
		"import/no-self-import": "error",
		"import/no-duplicates": "error",
		"import/order": [
			"error",
			{
				"newlines-between": "always",
				alphabetize: { "order": "asc", "caseInsensitive": true },
				groups: ["builtin", "external", "internal", ["parent", "sibling", "index", "object"], "type", "unknown"],
				pathGroups: [
					{
						pattern: "**/*.+(css|sass|less|scss|pcss|styl|woff)",
						patternOptions: { dot: true, nocomment: true },
						group: "unknown",
						position: "after"
					},
					{
						pattern: "{.,..}/**/*.+(css|sass|less|scss|pcss|styl|woff)",
						patternOptions: { dot: true, nocomment: true },
						group: "unknown",
						position: "after"
					}
				],
				warnOnUnassignedImports: true
			}
		],

		"eqeqeq": "error",
		"no-debugger": "warn",
		"eol-last": ["error", "always"],
		"prefer-const": "error",
		"no-mixed-spaces-and-tabs": "error",
		"linebreak-style": "off",
		"operator-linebreak": ["error", "before"],
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"indent": "off",
		"no-empty": "off",
		"no-empty-function": "off",
		"no-unused-vars": "off",
		"no-cond-assign": "error",
		"comma-dangle": "off",
		"no-multi-spaces": ["error"],
		"no-multiple-empty-lines": "error",
		"no-multiple-empty-lines": ["error", { max: 2, maxBOF: 0 }],
		"no-restricted-imports": ["error", {
			"paths": [
				{ name: "react", importNames: ["default"], message: "Please do not import React." },
			]
		}],

		"@typescript-eslint/comma-dangle": "error",
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/no-inferrable-types": "error",
		"@typescript-eslint/no-empty-function": "error",
		"@typescript-eslint/no-empty-interface": "error",
		"@typescript-eslint/no-unsafe-declaration-merging": "error",
		"@typescript-eslint/no-unsafe-enum-comparison": "error",
		"@typescript-eslint/explicit-module-boundary-types": "error",
		"@typescript-eslint/no-duplicate-enum-values": "error",
		"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", destructuredArrayIgnorePattern: "^_", args: "after-used" }],
		"@typescript-eslint/naming-convention": [
			"error",
			{ selector: "default", format: ["camelCase"] },

			{ selector: "variable", modifiers: ["exported"], filter: { regex: "^use", match: true }, format: ["camelCase"] },
			{ selector: "variable", modifiers: ["global"], format: ["PascalCase"] },
			{ selector: "variable", format: ["camelCase"], leadingUnderscore: "allow" },

			{ selector: "function", modifiers: ["exported"], filter: { regex: "^use", match: true }, format: ["camelCase"] },
			{ selector: "function", modifiers: ["global"], format: ["PascalCase"] },
			{ selector: "function", format: ["camelCase"] },

			{ selector: "parameter", format: ["camelCase"], format: null },

			{ selector: "property", format: null },
			{ selector: "property", types: ["array", "boolean", "function", "string"], format: ["camelCase", "snake_case", "PascalCase"] },

			{ selector: "classProperty", types: ["number"], format: ["camelCase"], leadingUnderscore: "allow" },
			{ selector: "property", types: ["string", "boolean"], filter: { regex: "^Access-Control-.*", match: true }, format: null },

			{ selector: "method", format: ["camelCase"] },

			{ selector: "enumMember", format: ["PascalCase"] },
			{ selector: "typeLike", format: ["PascalCase"] },

			{ selector: "import", format: null }
		],

		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-fragments": ["error", "element"],
		"react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }],
		"react/no-arrow-function-lifecycle": "error",
		"react/no-danger": "error",
		"react/no-deprecated": "error",
		"react/no-did-mount-set-state": "error",
		"react/no-did-update-set-state": "error",
		"react/no-direct-mutation-state": "error",
		"react/no-is-mounted": "error",
		"react/no-unused-state": "warn",
		"react/no-multi-comp": ["error", { ignoreStateless: true }],
		"react/no-unescaped-entities": "off",
		"react/jsx-newline": ["error", { prevent: true, allowMultilines: true }],
		"react/hook-use-state": ["off", { allowDestructuredState: true }],
		"react/jsx-curly-newline": ["error", { multiline: "consistent", singleline: "consistent" }],
		"react/self-closing-comp": ["error", { component: true, html: true }],
		"react/jsx-wrap-multilines": ["error", {
			"declaration": "parens-new-line",
			"assignment": "parens-new-line",
			"return": "parens-new-line",
			"arrow": "parens-new-line",
			"condition": "ignore",
			"logical": "ignore",
			"prop": "ignore"
		}],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "error",
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
	},
	overrides: [
		{
			files: ["./src/store/store.ts"],
			rules: {
				"no-restricted-imports": ["error", { "paths": [{ name: "react", importNames: ["default"], message: "Please do not import React." }] }]
			}
		}
	]
};