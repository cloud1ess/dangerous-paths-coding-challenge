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

  const possibleMoves = {}
  possibleMoves[DIRS.down] = {x:0, y:1};
  possibleMoves[DIRS.right] = {x:1, y:0};
  possibleMoves[DIRS.up] = {x:0, y:-1};
  possibleMoves[DIRS.left] = {x:-1, y:0};

  opposites = {}
  opposites[DIRS.down] = DIRS.up;
  opposites[DIRS.right] = DIRS.left;
  opposites[DIRS.up] = DIRS.down;
  opposites[DIRS.left] = DIRS.right;

  function getNextMove(api, lastMove) {
    var nextMove
    for (var move in possibleMoves) {
      if (move !== opposites[lastMove]) {
        if (api.getCellTypeFromOffset(possibleMoves[move]) === CELL_TYPES.path) return move
      }
    }
  }

  function runSolution (index, api) {
    let outcome;
    let count = 0;
    let lastMove;
    while(outcome !== OUTCOMES.finish && count < 100){
      const move = getNextMove(api, lastMove);
      outcome = api.getOutcomeFromOffset(possibleMoves[move]);
      api.move(move);
      lastMove = move;
      count++;
    }
  }

  function stopSolution() {
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
