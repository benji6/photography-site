const R = require('ramda');
const keyboardListeners = require('./ui/keyboardListeners.js');
const swipeListeners = require('./ui/swipeListeners.js');

module.exports = {
  setEscape: (fn) => {
    keyboardListeners.escape = fn;
  },
  setLeft: (fn) => {
    keyboardListeners.left = fn;
    swipeListeners.left = fn;
  },
  setRight: (fn) => {
    keyboardListeners.right = fn;
    swipeListeners.right = fn;
  },
  reset: () => {
    R.forEach((key) => keyboardListeners[key] = () => {}, Object.keys(keyboardListeners));
    R.forEach((key) => swipeListeners[key] = () => {}, Object.keys(swipeListeners));
  },
};
