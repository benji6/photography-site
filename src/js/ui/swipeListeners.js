var startX
var startY
var startTime

const threshold = 30
const restraint = 100
const allowedTime = 3000

const listeners = {
  left: () => {},
  right: () => {}
}

document.addEventListener('touchend', (e) => {
  const distX = e.changedTouches[0].pageX - startX
  const distY = e.changedTouches[0].pageY - startY
  const elapsedTime = Date.now() - startTime
  if (elapsedTime > allowedTime) {
    return
  }
  if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
    listeners[distX < 0 ? 'right' : 'left']()
    return
  }
  if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
    listeners[distY < 0 ? 'right' : 'left']()
  }
})

document.addEventListener('touchstart', (e) => {
  startTime = Date.now()
  startX = e.changedTouches[0].pageX
  startY = e.changedTouches[0].pageY
})

module.exports = listeners
