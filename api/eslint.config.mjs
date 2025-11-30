import globals from "globals";
import { globalIgnoresConfig, jsonConfig, tsNodeConfigs, tsNodeSettings, tsNodeRules } from "../eslint.config.base.mjs";


export default [
	globalIgnoresConfig,
	...tsNodeConfigs,
	jsonConfig,

	{
		files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],

		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: { projectService: true, sourceType: "module" }
		},

		settings: tsNodeSettings,
		rules: tsNodeRules
	}
];