const director = require('director');
const R = require('ramda');

module.exports = (controller) => {
  director.Router(R.reduce((acc, val) => R.assoc(val, controller.menuClick, acc), {}, [
    "/Home",
    "/Symbiosis",
    "/Darkroom",
    "/C41",
    "/Gesture",
    "/About",
    "/Contact",
    "/Exhibitions",
  ])).init();
};
