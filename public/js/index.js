$(function () {
  const socket = io()

  socket.on('on', (pin) => {
    const el = $(`button[data-src=${pin}]`)[0]
    el.classList.add('enabled')
  })

  socket.on('off', (pin) => {
    const el = $(`button[data-src=${pin}]`)[0]
    el.classList.remove('enabled')
  })

  $('button').each((i, btn) => {
    btn.addEventListener('click', function () {
      const pin = this.getAttribute('data-src')
      socket.emit('toggle', pin)
    })
  })
});