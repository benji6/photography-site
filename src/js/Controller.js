const createNavEvents = require('./createNavEvents.js');
const galleryData = require('./data/galleryData.js');
const Model = require('./Model.js');
const View = require('./View.js');
const ui = require('./ui.js');

module.exports = () => {
  const model = Model(galleryData);
  const controller = {};

  createNavEvents(controller);
  const view = View(model, controller);

  controller.menuClick = (viewName) => {
    model.setViewName(viewName);
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

  view.render();
};
