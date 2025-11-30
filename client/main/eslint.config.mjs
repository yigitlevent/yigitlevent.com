import globals from "globals";
import { globalIgnoresConfig, jsonConfig, tsReactConfigs, tsReactSettings, tsReactRules } from "../../eslint.config.base.mjs";


export default [
	globalIgnoresConfig,
	...tsReactConfigs,
	jsonConfig,

	{
		files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],

		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: { projectService: true, sourceType: "module" }
		},

		settings: tsReactSettings,
		rules: tsReactRules
	}
];
