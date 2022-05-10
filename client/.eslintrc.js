module.exports = {
    env: {
        node: true,

        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: [0, 4, { SwitchCase: 1 }],
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "ignore", named: "never" }
        ],
        "multiline-ternary": ["off"],
        "prefer-const": 0,
        "array-callback-return": "off",
        "dot-notation": 0,
        quotes: [
            "error",
            "double",
            { allowTemplateLiterals: true, avoidEscape: true }
        ],
        "template-curly-spacing": ["error", "never"]
    }
};
