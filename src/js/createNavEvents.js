const R = require('ramda');

module.exports = (controller) => {
  R.forEach((element) =>
    element.onclick = () => element.parentNode.className = R.eq(element.parentNode.className, "collapsed") ?
      "expanded" :
      "collapsed", [].slice.call(document.querySelectorAll("nav > ul > li > div")));

  R.forEach((link) => link.onclick = () => window.location.hash = link.textContent,
    R.filter((element) => element.tagName !== "LI" || !element.children.length, [].slice.call(document.querySelectorAll("nav li"))));

    document.querySelector("nav > div.home").onclick = () => window.location.hash = "Home"; 
};
