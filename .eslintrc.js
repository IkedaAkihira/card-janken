module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "semi": [2, "always"],
        "jsdoc/require-jsdoc": 1,
        "jsdoc/require-param": 1
    },
    "plugins": [
        "jsdoc"
    ]
};
