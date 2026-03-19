import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
export default [
    {
        ignores: ["node_modules/**"],
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "module",
        },
        rules: {
            "no-console": "warn",
        },
    },
    eslintPluginPrettier,
];
