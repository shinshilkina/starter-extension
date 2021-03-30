module.exports = {
    'extends': ['airbnb', 'plugin:vue/essential'],
    'env': {
      'es6': true,
      'webextensions': true,
      'browser': true,
    },
    'parserOptions': {
      'parser': 'babel-eslint',
      'ecmaVersion': 6,
      'sourceType': 'module'
    },
    'rules': {
      "prefer-destructuring": 0,
      "vue/no-unused-components": 0
    }
  };
  