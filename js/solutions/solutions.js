function Solutions() {
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

  function runSolution(index, api) {
    var finish = false;
    var countMoves = 0;
    var previousMove;

    while (!finish && countMoves < 500) {
      var nextMove = getNextMove(api, previousMove);
      countMoves += 1;

      console.log("nextMove: ", nextMove);
      if(!nextMove) continue;

      var outcome = api.getOutcomeFromOffset(nextMove);
      console.log("nextMove outcome: ", outcome);

      if (outcome !== OUTCOMES.die) {
        api.move(nextMove);
        previousMove = getOpposite(nextMove);
      }

      var currentOutcome = api.getOutcomeFromOffset({ x: 0, y: 0 });
      if (currentOutcome === OUTCOMES.finish) finish = true;
      if (currentOutcome === OUTCOMES.die) break;
    }
  }

  function getNextMove(api, previousMovie) {
    var paths = [];
    for (const dir in DIR_OFFSET) {
      if (previousMovie === dir) continue;

      if (api.getCellTypeFromOffset(DIR_OFFSET[dir])) {
        paths.push(dir);
      }
    }

    if (paths.length === 0) return null;

    if (paths.length > 1) {
      return paths[Math.floor(Math.random() * paths.length)];
    }

    return paths.pop();
  }

  function getOpposite(dir) {
    return OPPOSITE[dir];
  }

  function stopSolution() {}

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  };
}
