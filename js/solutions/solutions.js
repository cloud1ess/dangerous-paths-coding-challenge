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
    api.move(DIRS.down);
    api.move(DIRS.down);
    api.move(DIRS.right);
    api.move(DIRS.right);
    api.move(DIRS.up);
    api.move(DIRS.right);
    api.move(DIRS.right);
    api.move(DIRS.down);
    api.move(DIRS.down);
  }

  function stopSolution() {
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
