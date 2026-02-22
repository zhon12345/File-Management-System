import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
	{ files: ["**/*.{js,mjs,cjs,vue}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
	{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
	{
		rules: {
			curly: ["error", "multi"],
			"handle-callback-err": "off",
			"max-nested-callbacks": ["error", { max: 4 }],
			"no-empty-function": "error",
			"no-inline-comments": "error",
			"no-lonely-if": "error",
			"no-shadow": ["error", { allow: ["err", "resolve", "reject"] }],
			"no-var": "error",
			"no-undef": "off",
			"prefer-const": "error",
			quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: false }],
			"spaced-comment": "error",
			yoda: "error",
		},
	},
	pluginVue.configs["flat/recommended"],
	eslintConfigPrettier,
]);
