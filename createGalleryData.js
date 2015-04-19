var fs = require('fs');
var R = require('ramda');
var path = require('path');

module.exports = function () {
  var galleriesData = {
    Home: require('./src/text/Home.js'),
    About: require('./src/text/About.js')
  };

  R.forEach(function (galleryName) {
    galleriesData[galleryName] = R.merge({
      imageSources: R.map(function (filename) {
        return path.join('images', galleryName, filename);
      }, fs.readdirSync(path.join('dist/images/', galleryName)))
    }, require('./src/text/' + galleryName + '.js'));
  }, fs.readdirSync('dist/images'));



  fs.writeFileSync('./src/js/data/galleryData.js', 'module.exports = ' +
    JSON.stringify(galleriesData) +
    ';');
};
