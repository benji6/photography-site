var R = require("ramda");

const listeners = {
  escape: () => {},
  left: () => {},
  right: () => {},
};

document.onkeydown = (e) => {
  const keyCodeEquals = R.equals(e.keyCode);
  if (keyCodeEquals(27)) {
    return listeners.escape();
  }
  if (keyCodeEquals(37) || keyCodeEquals(38) || keyCodeEquals(65) || keyCodeEquals(87)) {
    return listeners.left();
  }
  if (keyCodeEquals(39) || keyCodeEquals(40) || keyCodeEquals(68) || keyCodeEquals(83)) {
    return listeners.right();
  }
};

module.exports = listeners;
