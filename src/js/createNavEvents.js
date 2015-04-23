const R = require('ramda');

module.exports = (controller) => {
  R.forEach((element) =>
    element.onclick = () => element.parentNode.className = R.eq(element.parentNode.className, "collapsed") ?
      "expanded" :
      "collapsed", [].slice.call(document.querySelectorAll("nav > ul > li > span")));

  R.forEach(
    (link) => link.onclick = () => controller.menuClick(link.textContent),
    R.filter((liEl) => !liEl.children.length, [].slice.call(document.querySelectorAll('nav > h1, nav li')))
  );
};
