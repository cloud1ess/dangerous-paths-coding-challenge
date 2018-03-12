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

  const opposites = {}
  opposites[DIRS.down] = DIRS.up;
  opposites[DIRS.right] = DIRS.left;
  opposites[DIRS.up] = DIRS.down;
  opposites[DIRS.left] = DIRS.right;

  function getNextMove(api, position, history) {
    const lastMove = history.length && history[history.length - 1].move;
    const movesAlreadyTried = history.filter(h => h.pos.x === position.x && h.pos.y === position.y).map(h => h.move)
    var moveList = Object.keys(possibleMoves)
      .filter(m => m !== opposites[lastMove])
      .filter(m => movesAlreadyTried.indexOf(m) === -1)
      .concat(movesAlreadyTried)
      .concat(opposites[lastMove])
    return moveList.map((move) => { return {move: move, type: api.getCellTypeFromOffset(possibleMoves[move])}})
      .filter(mt => mt.type === CELL_TYPES.path || mt.type === CELL_TYPES.disappearing)[0].move
  }

  function getNewPosition(currentPosition, move) {
    var moves = {}
    moves[DIRS.down] = (pos) => { return {x: pos.x, y: pos.y + 1}}
    moves[DIRS.up] = (pos) => { return {x: pos.x, y: pos.y - 1}}
    moves[DIRS.left] = (pos) => { return {x: pos.x - 1, y: pos.y}}
    moves[DIRS.right] = (pos) => { return {x: pos.x + 1, y: pos.y}}
    return moves[move](currentPosition)
  }

  function waitForNextMove(api, position, history, move) {
    setTimeout(function () {
      const outcome = api.getOutcomeFromOffset(possibleMoves[move]);
      if ( outcome === OUTCOMES.survive ) {
        completeMove(api, position, history, move, outcome);
      } else {
        waitForNextMove(api, position, history, move);
      }
    }, 50);
  }

  function completeMove(api, position, history, move, outcome) {
    api.move(move);
    history.push({pos: position, move});
    position = getNewPosition(position, move);
    if (outcome !== OUTCOMES.finish) {
      runNextMove(api, position, history);
    }
  }

  function runNextMove(api, position, history) {
    const move = getNextMove(api, position, history);
    const cellType = api.getCellTypeFromOffset(possibleMoves[move]);
    const outcome = api.getOutcomeFromOffset(possibleMoves[move]);
    if ( cellType === CELL_TYPES.disappearing && outcome === OUTCOMES.die ) {
      waitForNextMove(api, position, history, move);
    } else {
      completeMove(api, position, history, move, outcome)
    }
  }

  function runSolution (index, api) {
    const history = []
    let outcome;
    let position = {x: 0, y: 0};

    runNextMove(api, position, history);
  }

  function stopSolution() {
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
