var fs = require("fs");
var R = require("ramda");
var path = require("path");

module.exports = function () {
  var galleriesData = {};

  R.forEach(function (galleryName) {
    galleriesData[galleryName] = {
      imageSources: R.map(function (filename) {
        return path.join("images", galleryName, filename);
      }, fs.readdirSync(path.join("dist/images/", galleryName))),
    };
  }, fs.readdirSync("dist/images"));

  fs.writeFileSync("./src/js/data/galleryData.js", "module.exports = " +
    JSON.stringify(galleriesData) + ";");
};
