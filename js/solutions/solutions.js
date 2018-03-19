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

  const offsetForMove = {}
  offsetForMove[DIRS.down] = {x:0, y:1};
  offsetForMove[DIRS.right] = {x:1, y:0};
  offsetForMove[DIRS.up] = {x:0, y:-1};
  offsetForMove[DIRS.left] = {x:-1, y:0};

  const oppositeMove = {}
  oppositeMove[DIRS.down] = DIRS.up;
  oppositeMove[DIRS.right] = DIRS.left;
  oppositeMove[DIRS.up] = DIRS.down;
  oppositeMove[DIRS.left] = DIRS.right;

  function getPossibleMoves(api, path, position) {
    const lastMove = path.length > 0 ? path[path.length - 1].move : undefined;
    const movesAlreadyTried = path.filter(p => p.position.x === position.x && p.position.y === position.y).map(p => p.move)
    var moveList = Object.keys(offsetForMove)
      .filter(m => m !== oppositeMove[lastMove])
      .filter(m => !movesAlreadyTried.includes(m))
      .concat(movesAlreadyTried)
      .concat(lastMove ? oppositeMove[lastMove] : []);
    return moveList
      .map((move) => {
        return {
          move: move,
          type: api.getCellTypeFromOffset(getOffset(position, move))
        }
      })
      .filter(mt => mt.type === CELL_TYPES.path || mt.type === CELL_TYPES.disappearing)
      .map(mt => mt.move);
  }

  function getNewPosition(currentPosition, move) {
    var moves = {}
    moves[DIRS.down] = (pos) => { return {x: pos.x, y: pos.y + 1}}
    moves[DIRS.up] = (pos) => { return {x: pos.x, y: pos.y - 1}}
    moves[DIRS.left] = (pos) => { return {x: pos.x - 1, y: pos.y}}
    moves[DIRS.right] = (pos) => { return {x: pos.x + 1, y: pos.y}}
    return moves[move](currentPosition)
  }

  function getOffset(position, move) {
    return {
      x: position.x + offsetForMove[move].x,
      y: position.y + offsetForMove[move].y,
    }
  }

  function waitForNextMove(api, move) {
    const cellType = api.getCellTypeFromOffset(offsetForMove[move]);
    const outcome = api.getOutcomeFromOffset(offsetForMove[move]);
    if ( cellType === CELL_TYPES.disappearing && outcome === OUTCOMES.die ) {
      return new Promise(function(resolve) {
        const handle = setInterval(function () {
          const outcome = api.getOutcomeFromOffset(offsetForMove[move]);
          if ( outcome === OUTCOMES.survive ) {
            clearInterval(handle)
            resolve();
          }
        }, 50);
      })
    } else {
      return Promise.resolve();
    }
  }

  async function makeNextMove(api, move) {
    await waitForNextMove(api, move);
    api.move(move);
  }

  function findPath (api) {
    let path = [];
    let position = { x: 0, y: 0 };
    let outcome;
    while (outcome !== OUTCOMES.finish) {
      const moves = getPossibleMoves(api, path, position);
      const move = moves[0];
      outcome = api.getOutcomeFromOffset(getOffset(position, move));
      path.push({
        position,
        move,
        moves
      });
      position = getNewPosition(position, move);
    }
    return path;
  }

  async function runSolution (index, api) {
    const path = findPath(api);
    for (const move of path.map(p => p.move)){
      await makeNextMove(api, move);
    }
  }

  function stopSolution() {
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
