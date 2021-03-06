const R = require('ramda')
const navLinks = require('./data/navLinks.js')

module.exports = () => {
  R.forEach((element) =>
    element.onclick = () => element.parentNode.className = R.equals(element.parentNode.className, 'collapsed')
      ? 'expanded'
      : 'collapsed', [].slice.call(document.querySelectorAll('nav > ul > li > div')))

  R.forEach((link) => link.onclick = () => window.location.hash = link.id,
  R.map((str) => document.querySelector(`#${str}`), navLinks))
}
