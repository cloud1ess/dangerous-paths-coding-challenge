function Solutions() {

  // ------------------------------------------------------------
  //  Game Api
  // ------------------------------------------------------------
  //
  // api.move(dir <DIRS>)
  // api.getOutcomeFromOffset({x:1, y:0}) returns outcome <OUTCOMES>
  // api.getCellTypeFromOffset({x:1, y:0}) returns cellType <CELL_TYPES>
  //
  // Refer to constants.js for <data type>
  // Offset is the relative to the players position

  var timer;

  function runSolution(index, api) {

    timer = window.setInterval(function () {
      AttemptJourney(api);
    }, 100);

  }

  function stopSolution() {
    window.clearInterval(timer);
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}