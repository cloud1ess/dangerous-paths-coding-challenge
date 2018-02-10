function Solutions () {

  var timeout

  function runScenario (index, api) {
    // api.move(dir) dir = up/down/left/right
    // api.getCellType(x, y) returns empty/path/finish/mover

    if (timeout) {
      clearInterval(timeout)
      timeout = null;
    }

    if (index === 0){
      api.move('down');
      api.move('down');
      api.move('right');
      api.move('right');

    } else if (index === 1){
      timeout = setTimeout(function () {
        api.move('down');
        api.move('down');
        api.move('right');
        api.move('right');
      }, 2100)
    }

  }

  return {
    runScenario: runScenario
  }
}
