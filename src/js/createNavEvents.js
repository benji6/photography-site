const R = require('ramda');

module.exports = (controller) => {
  R.forEach((element) =>
    element.onclick = () => element.parentNode.className = R.eq(element.parentNode.className, "collapsed") ?
      "expanded" :
      "collapsed", [].slice.call(document.querySelectorAll("nav > ul > li > div")));

  R.forEach(
    (link) => link.onclick = () => controller.menuClick(link.textContent),
    R.filter((element) => element.tagName !== "LI" || !element.children.length, [].slice.call(document.querySelectorAll('nav > div.home, nav li')))
  );
};
