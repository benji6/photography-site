const R = require('ramda');
const render = require('./render.js');

module.exports = () => {
  const parentMenuItems = [].slice.call(document.querySelectorAll("nav > ul > li > span"));

  R.forEach((element) =>
    element.onclick = () => element.parentNode.className = R.eq(element.parentNode.className, "collapsed") ?
      "expanded" :
      "collapsed", parentMenuItems);

  const projectLinks = [].slice.call(document.querySelector('#projects').children);

  R.forEach(
    (projectLink) => projectLink.onclick = () => render(projectLink.textContent),
    projectLinks
  );
};
