const R = require('ramda');
const render = require('./render.js');

module.exports = () => {
  R.forEach((element) =>
    element.onclick = () => element.parentNode.className = R.eq(element.parentNode.className, "collapsed") ?
      "expanded" :
      "collapsed", [].slice.call(document.querySelectorAll("nav > ul > li > span")));

  R.forEach(
    (link) => link.onclick = () => render(link.textContent),
    R.filter((liEl) => !liEl.children.length, [].slice.call(document.querySelectorAll('li')))
  );
};
