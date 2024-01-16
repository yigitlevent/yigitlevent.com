module.exports = {
	root: true,
	env: {
		browser: false,
		es2021: true
	},
	settings: {
		"import/resolver": {
			"eslint-import-resolver-custom-alias": {
				alias: {
					"@utility": "../utility/src"
				},
				extensions: [".ts", ".tsx"]
			}
		}
	},
	extends: ["eslint:recommended", "plugin:import/typescript", "plugin:@typescript-eslint/recommended", "plugin:json/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		version: "detect",
		ecmaFeatures: { "jsx": false },
		ecmaVersion: 12,
		sourceType: "module",
		project: ["./tsconfig.json"]
	},
	ignorePatterns: ["node_modules", "dist", "build", "package.json", "tsconfig.json", ".eslintrc.cjs"],
	plugins: ["import", "@typescript-eslint", "json"],
	rules: {
		"json/*": ["error", "allowComments"],

		"import/named": "off",
		"import/newline-after-import": ["error", { count: 2 }],
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
		"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", args: "after-used" }],
		"@typescript-eslint/naming-convention": [
			"error",
			{ selector: "default", format: ["camelCase"] },

			{ selector: "variable", modifiers: ["global"], format: ["PascalCase"] },
			{ selector: "variable", format: ["camelCase"] },

			{ selector: "function", modifiers: ["global"], format: ["PascalCase"] },
			{ selector: "function", format: ["camelCase"] },

			{ selector: "parameter", format: ["camelCase"], format: null },
			{ selector: "property", format: ["camelCase", "snake_case", "PascalCase"] },
			{ selector: "method", format: ["camelCase"] },
			{ selector: "classProperty", format: ["camelCase"], leadingUnderscore: "allow" },

			{ selector: "enumMember", format: ["PascalCase"] },
			{ selector: "typeLike", format: ["PascalCase"] },

			{ selector: "import", format: null }
		],
	}
};
