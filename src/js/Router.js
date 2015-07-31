const director = require("director");
const R = require("ramda");
const navLinks = require("./data/navLinks.js");

module.exports = (model, controller) => {
  const navRoutes = R.reduce((acc, val) => R.assoc(val, controller.menuClick, acc), {}, navLinks);
  const imgRoutes = R.reduce((acc, val) => R.assoc(val, controller.openModal, acc), {}, model.getAllImageSources());

  director.Router(R.merge(navRoutes, imgRoutes)).init();
};
