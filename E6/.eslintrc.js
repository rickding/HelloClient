module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  // "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "rules": {
    "no-console": 1,
    // "react/prop-types": [2, { "ignore": ["children"] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
};
