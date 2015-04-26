const R = require('ramda');

module.exports = (galleryData) => {
  var isModal = false;
  var currentImage = null;

  const getViewName = () => window.location.hash.indexOf("/") === -1 ?
      window.location.hash.slice(1) ?
        window.location.hash.slice(1) :
        "Home" :
      window.location.hash.split("/")[1];

  return {
    galleryData,
    getAllImageSources: () => R.flatten(R.map((key) => galleryData[key].imageSources ?
      galleryData[key].imageSources :
      [], R.keys(galleryData))),
    getCurrentImage: () => currentImage,
    getImageSources: (viewName) => galleryData[viewName].imageSources,
    getViewName,
    isModal,
    setCurrentImage: (src) => currentImage = src,
    setNextImage: () => {
      const images = galleryData[getViewName()].imageSources;
      const currentIndex = R.indexOf(currentImage, images);
      const newIndex = R.eq(currentIndex, images.length - 1) ?
        currentIndex : currentIndex + 1;
      currentImage = R.nth(newIndex, images);
    },
    setPrevImage: () => {
      const images = galleryData[getViewName()].imageSources;
      const currentIndex = R.indexOf(currentImage, images);
      const newIndex = R.eq(currentIndex, 0) ?
        currentIndex : currentIndex - 1;
      currentImage = R.nth(newIndex, images);
    },
  };
};
