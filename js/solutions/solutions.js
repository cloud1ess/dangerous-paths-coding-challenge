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

  function getBestNextMove(api, state) {
    const {position, history} = state;
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

  async function makeNextMove(api, state, move) {
    const {position, history} = state;
    const cellType = api.getCellTypeFromOffset(possibleMoves[move]);
    const outcome = api.getOutcomeFromOffset(possibleMoves[move]);
    if ( cellType === CELL_TYPES.disappearing && outcome === OUTCOMES.die ) {
      return new Promise(function(resolve) {
        const handle = setInterval(function () {
          const outcome = api.getOutcomeFromOffset(possibleMoves[move]);
          if ( outcome === OUTCOMES.survive ) {
            clearInterval(handle)
            resolve(outcome);
          }
        }, 50);
      })
    } else {
      return Promise.resolve(outcome);
    }
  }

  async function doNextMove(api, state) {
    const {position, history} = state;
    const move = getBestNextMove(api, state);
    const outcome = await makeNextMove(api, state, move)
    api.move(move);
    return {
      history: history.concat({pos: position, move}),
      position: getNewPosition(position, move),
      outcome
    }
  }

  async function runSolution (index, api) {
    let state = {
      history: [],
      position: {x: 0, y: 0}
    };

    while (state.outcome !== OUTCOMES.finish) {
      state = await doNextMove(api, state);
    }

  }

  function stopSolution() {
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
