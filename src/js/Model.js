const R = require('ramda');

module.exports = (galleryData) => {
  var viewName = "Home";
  var isModal = false;
  var currentImage = null;

  return {
    galleryData,
    getCurrentImage: () => currentImage,
    getImageSources: (viewName) => galleryData[viewName].imageSources,
    getViewName: () => viewName,
    isModal,
    setCurrentImage: (src) => currentImage = src,
    setNextImage: () => {
      const images = galleryData[viewName].imageSources;
      const currentIndex = R.indexOf(currentImage, images);
      const newIndex = R.eq(currentIndex, images.length - 1) ?
        currentIndex : currentIndex + 1;
      currentImage = R.nth(newIndex, images);
    },
    setPrevImage: () => {
      const images = galleryData[viewName].imageSources;
      const currentIndex = R.indexOf(currentImage, images);
      const newIndex = R.eq(currentIndex, 0) ?
        currentIndex : currentIndex - 1;
      currentImage = R.nth(newIndex, images);
    },
    setViewName: (newViewName) => viewName = newViewName,
  };
};
