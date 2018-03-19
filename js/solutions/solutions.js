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

  function getPossibleMoves(api, route, position) {
    const lastMove = route.length > 0 ? route[route.length - 1].move : undefined;
    var moveList = Object.keys(offsetForMove)
      .filter(m => m !== oppositeMove[lastMove]);
    return moveList
      .map((move) => {
        return {
          move: move,
          cellType: api.getCellTypeFromOffset(getOffset(position, move))
        }
      })
      .filter(mt => mt.cellType === CELL_TYPES.path || mt.cellType === CELL_TYPES.disappearing)
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

  function findBestPath (api) {
    let possiblePaths = [
      {
        currentPosition: { x: 0, y: 0 },
        route: [],
        outcome: undefined
      }
    ];

    while (!possiblePaths.some(pp => pp.outcome === OUTCOMES.finish)) {
      let newPaths = []
      possiblePaths.forEach((pp) => {
        const {currentPosition, route} = pp;
        const moves = getPossibleMoves(api, route, currentPosition);
        moves.forEach((move, j) => {
          const outcome = api.getOutcomeFromOffset(getOffset(currentPosition, move));
          const newPosition = getNewPosition(currentPosition, move);
          if (j > 0) {
            newPaths.push({
              currentPosition: newPosition,
              route: cloneRoute(route).concat([{
                position: currentPosition,
                move
              }]),
              outcome
            });
          } else {
            pp.currentPosition = newPosition;
            pp.route = cloneRoute(route).concat([{
              position: currentPosition,
              move
            }]);
            pp.outcome = outcome
          }
        })
      })
      possiblePaths = possiblePaths.concat(newPaths)
    }
    return possiblePaths.filter(pp => pp.outcome === OUTCOMES.finish)[0];
  }

  function cloneRoute (route) {
    return route.map((r) => {
      return {
        position: { x: r.position.x, y: r.position.y },
        move: r.move
      }
    });
  }

  async function runSolution (index, api) {
    const bestPath = findBestPath(api);
    for (const move of bestPath.route.map(p => p.move)){
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
