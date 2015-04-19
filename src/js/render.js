const createElement = require('virtual-dom/create-element');
const diff = require('virtual-dom/diff');
const h = require('virtual-dom/h');
const patch = require('virtual-dom/patch');
const R = require('ramda');
const galleryData = require('./data/galleryData.js');

var container = document.querySelector("#mutableContent");

const createVirtualDescription = (galleryName) =>
  galleryData[galleryName].description &&
    h("section.description", R.prepend(h("h2", galleryName), R.map((textObj) =>
      h("p", textObj.p), galleryData[galleryName].description)));

const createVirtualImages = (galleryName) => h("section.gallery", R.map((src) => h("img.thumb", {
  oncontextmenu: () => false,
  src
}), galleryData[galleryName].imageSources));

const createVirtualFooter = (galleryName) =>
  galleryData[galleryName].footer &&
    h("footer", R.map((textObj) =>
      h("p", textObj.p), galleryData[galleryName].footer));

const createVirtualRoot = (galleryName) => h("div", R.map((fn) => fn(galleryName), [
  createVirtualDescription,
  createVirtualImages,
  createVirtualFooter
]));

var virtualRoot = createVirtualRoot("Home");
const domRoot = container.appendChild(createElement(virtualRoot));

module.exports = (viewName) => {
  const newVirtualRoot = createVirtualRoot(viewName);
  patch(domRoot, diff(virtualRoot, newVirtualRoot));
  virtualRoot = newVirtualRoot;
};
