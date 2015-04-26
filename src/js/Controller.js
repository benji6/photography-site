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
    view.render();
  };

  controller.openModal = () => {
    model.setCurrentImage(window.location.hash.slice(1));
    model.isModal = true;
    ui.setEscape(controller.closeModal);
    ui.setLeft(() => {
      model.setPrevImage();
      window.location.hash = model.getCurrentImage();
    });
    ui.setRight(() => {
      model.setNextImage();
      window.location.hash = model.getCurrentImage();
    });
    view.render();
  };

  controller.closeModal = () => {
    ui.reset();
    model.isModal = false;
    window.location.hash = model.getViewName();
  };

  Router(model, controller);

  view.render();
};
