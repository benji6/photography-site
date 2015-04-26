const galleryData = require('./data/galleryData.js');
const Model = require('./Model.js');
const View = require('./View.js');
const ui = require('./ui.js');
const Router = require('./Router');
const createNavEvents = require('./createNavEvents.js');

module.exports = () => {
  const model = Model(galleryData);
  const controller = {};

  const view = View(model, controller);

  createNavEvents();

  controller.menuClick = () => {
    model.setViewName(window.location.hash.slice(1));
    view.render();
  };

  controller.openModal = (src) => {
    model.setCurrentImage(src);
    model.isModal = true;
    ui.setEscape(controller.closeModal);
    ui.setLeft(() => {
      model.setPrevImage();
      view.render();
    });
    ui.setRight(() => {
      model.setNextImage();
      view.render();
    });
    view.render();
  };

  controller.closeModal = () => {
    ui.reset();
    model.isModal = false;
    view.render();
  };

  Router(controller);

  view.render();
};
