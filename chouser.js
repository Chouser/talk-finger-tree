var original_setupMenu = setupMenu;

window.addEventListener('load', function() {
  window.setupMenu = function() {
    $('#preso').cycle({
      speed: 400,
      timeout: 0
    })

    original_setupMenu();
  }
});

