import globals from "globals";
import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import tsEslint from "typescript-eslint";
import pImport from "eslint-plugin-import";
import pReact from "eslint-plugin-react";
import pReactHooks from "eslint-plugin-react-hooks";
import pReactRefresh from "eslint-plugin-react-refresh";
import pJson from 'eslint-plugin-json';


export default [
	eslint.configs.recommended,
	...tsEslint.configs.strictTypeChecked,
	...tsEslint.configs.stylisticTypeChecked,
	pReact.configs.flat["jsx-runtime"],
	pReactHooks.configs.flat.recommended,
	pReactRefresh.configs.vite,
	pImport.flatConfigs.typescript,

	globalIgnores([
		"**/node_modules/**/*",
		"**/dist",
		"**/build",
		"**/package.json",
		"**/package-lock.json",
		"**/tsconfig.json",
		"**/tsconfig.node.json",
		"**/vite.config.ts",
		"**/eslint.config.mjs",
		"**/components_old/**/*.tsx",
		"**/oldStores/**/*.tsx"
	]),

	{
		...pJson.configs["recommended-with-comments"],

		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: { extraFileExtensions: ['.json'], projectService: true, sourceType: "module" }
		},

		rules: {
			"json/undefined": "error",
			"json/enum-value-mismatch": "error",
			"json/unexpected-end-of-comment": "error",
			"json/unexpected-end-of-string": "error",
			"json/unexpected-end-of-number": "error",
			"json/invalid-unicode": "error",
			"json/invalid-escape-character": "error",
			"json/invalid-character": "error",
			"json/property-expected": "error",
			"json/comma-expected": "error",
			"json/colon-expected": "error",
			"json/value-expected": "error",
			"json/comma-or-close-backet-expected": "error",
			"json/comma-or-close-brace-expected": "error",
			"json/trailing-comma": "error",
			"json/duplicate-key": "error",
			"json/comment-not-permitted": "error",
			"json/schema-resolve-error": "error",
			"json/unknown": "error"
		}
	},

	{
		files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],

		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: { projectService: true, sourceType: "module" }
		},

		settings: {
			react: { version: "detect" },

			"import/resolver": {
				"eslint-import-resolver-custom-alias": {
					alias: { "@utility": "../../utility/src" },
					extensions: [".ts", ".tsx"]
				}
			}
		},

		rules: {
			"import/named": "off",
			"import/newline-after-import": ["error", { count: 2 }],
			"import/no-default-export": "error",
			"import/no-unresolved": ["error", { ignore: ["\\.woff$"] }],
			"import/no-self-import": "error",
			"import/no-duplicates": "error",
			"import/order": ["error", {
				"newlines-between": "always",
				"alphabetize": { "order": "asc", "caseInsensitive": true },
				"groups": ["builtin", "external", "internal", ["parent", "sibling", "index", "object"], "type", "unknown"],
				"pathGroups": [
					{ pattern: "**/*.+(css|sass|less|scss|pcss|styl|woff)", patternOptions: { dot: true, nocomment: true }, group: "unknown", position: "after" },
					{ pattern: "{.,..}/**/*.+(css|sass|less|scss|pcss|styl|woff)", patternOptions: { dot: true, nocomment: true }, group: "unknown", position: "after" }
				],
				"warnOnUnassignedImports": true
			}],

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
			"no-multi-spaces": "error",
			"no-multiple-empty-lines": "error",
			"no-multiple-empty-lines": ["error", { max: 2, maxBOF: 0 }],
			"no-restricted-imports": ["error", { "paths": [{ name: "react", importNames: ["default"], message: "Please do not import React." }] }],

			"@/comma-dangle": "error",
			"@/indent": ["error", "tab"],

			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-inferrable-types": "error",
			"@typescript-eslint/no-empty-function": "error",
			"@typescript-eslint/no-empty-interface": "error",
			"@typescript-eslint/no-unsafe-declaration-merging": "error",
			"@typescript-eslint/no-unsafe-enum-comparison": "error",
			"@typescript-eslint/no-duplicate-enum-values": "error",
			"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", destructuredArrayIgnorePattern: "^_", args: "after-used" }],
			"@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true, allowTypedFunctionExpressions: true }],
			"@typescript-eslint/explicit-module-boundary-types": "error",
			"@typescript-eslint/naming-convention": [
				"error",
				{ selector: "default", format: ["camelCase"] },
				{ selector: "variable", modifiers: ["exported"], filter: { regex: "^use", match: true }, format: ["camelCase"] }, { selector: "variable", modifiers: ["global"], format: ["PascalCase"] },
				{ selector: "variable", format: ["camelCase"], leadingUnderscore: "allow" }, { selector: "function", modifiers: ["exported"], filter: { regex: "^use", match: true }, format: ["camelCase"] },
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
				{ selector: "import", format: null }],

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
			"react-hooks/set-state-in-effect": "off",
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
		}
	}
]

