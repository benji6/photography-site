const createNavEvents = require('./createNavEvents.js');
const galleryData = require('./data/galleryData.js');
const Model = require('./Model.js');
const View = require('./View.js');
const keyboardListeners = require('./keyboardListeners.js');

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
    keyboardListeners.escape = controller.closeModal;
    keyboardListeners.left = () => {
      model.setPrevImage();
      view.render();
    };
    keyboardListeners.right = () => {
      model.setNextImage();
      view.render();
    };
    view.render();
  };

  controller.closeModal = () => {
    keyboardListeners.escape = () => {};
    model.isModal = false;
    view.render();
  };


  view.render();
};
