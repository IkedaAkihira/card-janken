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
        "jsdoc/require-param": 1,
        "jsdoc/check-types": 1,
        "jsdoc/check-values": 1,
        "no-unused-vars":'warn'
    },
    "plugins": [
        "jsdoc"
    ]
};
