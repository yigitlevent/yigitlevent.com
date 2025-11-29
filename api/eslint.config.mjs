import globals from "globals";
import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import tsEslint from "typescript-eslint";
import pStylistic from '@stylistic/eslint-plugin';
import pImport from "eslint-plugin-import";
import pJson from "eslint-plugin-json";


export default [
	eslint.configs.recommended,
	...tsEslint.configs.strictTypeChecked,
	...tsEslint.configs.stylisticTypeChecked,
	pStylistic.configs.recommended,
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
			"prefer-const": "error",
			"no-empty": "off",
			"no-empty-function": "off",
			"no-unused-vars": "off",
			"no-cond-assign": "error",

			"@stylistic/arrow-parens": ["error", "as-needed"],
			"@stylistic/no-extra-parens": "error",
			"@stylistic/no-multi-spaces": "error",
			"@stylistic/operator-linebreak": ["error", "before"],
			"@stylistic/linebreak-style": "off",
			"@stylistic/semi": ["error", "always"],
			"@stylistic/no-extra-semi": "error",
			"@stylistic/no-mixed-spaces-and-tabs": "error",
			"@stylistic/eol-last": ["error", "always"],
			"@stylistic/max-statements-per-line": "off",
			"@stylistic/quotes": ["error", "double"],
			"@stylistic/no-multiple-empty-lines": ["error", { max: 2, maxBOF: 0 }],
			"@stylistic/no-tabs": "off",
			"@stylistic/comma-dangle": ["error", "never"],
			"@stylistic/jsx-indent-props": ["error", "tab"],
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/member-delimiter-style": [
				"error", {
					"multiline": {
						"delimiter": "semi",
						"requireLast": true
					},
					"singleline": {
						"delimiter": "semi",
						"requireLast": true
					},
					"overrides": {
						"interface": {
							"multiline": {
								"delimiter": "semi",
								"requireLast": true
							}
						}
					}
				}
			],

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
				{ selector: "import", format: null }
			],
		}
	}
]

