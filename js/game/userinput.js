function UserInput (moveCallback) {
  window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   switch (key) {
     case 37: moveCallback('left'); break;
     case 38: moveCallback('up'); break;
     case 39: moveCallback('right'); break;
     case 40: moveCallback('down'); break;
   }
  }

  function tearDown () {
    window.onkeyup = null;
  }

  return {
    tearDown: tearDown
  }
}
