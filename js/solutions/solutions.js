function Solutions () {

  // ------------------------------------------------------------
  //  Game Api
  // ------------------------------------------------------------
  //
  // api.move(dir <DIRS>)
  // api.getOutcomeFromOffset({x:1, y:0}}) returns outcome <OUTCOMES>
  // api.getCellTypeFromOffset({x:1, y:0}}) returns cellType <CELL_TYPES>
  //
  // Refer to constants.js for <data type>
  // Offset is the relative to the players position

  function runSolution (index, api) {
    var step = 0;
    setInterval(function () {
      api.move([
        DIRS.down,
        DIRS.down,
        DIRS.right,
        DIRS.right,
        DIRS.up,
        DIRS.right,
        DIRS.right,
        DIRS.down,
        DIRS.down,
      ][step++]);
    }, 100);
  }

  function stopSolution() {
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
