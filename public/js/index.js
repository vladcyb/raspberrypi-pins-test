$(function(){
  $('button').each((i, btn) => {
    btn.addEventListener('click', function() {
      console.log(this.getAttribute('data-src'))
    })
  })
});