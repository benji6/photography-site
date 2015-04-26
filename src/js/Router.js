const director = require('director');
const R = require('ramda');

module.exports = (model, controller) => {
  const navRoutes = R.reduce((acc, val) => R.assoc(val, controller.menuClick, acc), {}, [
    "Home",
    "Symbiosis",
    "Darkroom",
    "C41",
    "Gesture",
    "About",
    "Contact",
    "Exhibitions",
  ]);

  const imgRoutes = R.reduce((acc, val) => R.assoc(val, controller.openModal, acc), {}, model.getAllImageSources());

  director.Router(R.merge(navRoutes, imgRoutes)).init();
};
