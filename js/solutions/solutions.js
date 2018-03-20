function Solutions () {

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

  var previousMoves = new Map();
  var availableMoves = {
    up: {cell:{x:0, y:-1}, direction: DIRS.up},
    down: {cell: {x:0, y:1}, direction: DIRS.down}, 
    right: {cell: {x:1, y:0}, direction: DIRS.right}, 
    left: {cell:{x:-1, y:0}, direction: DIRS.left}
  };


  function runSolution (index, api) {
    switch (index) {
      case 0: 
        multiPath(api);
        break;
      case 1:
        multiPath(api);
        break;
      case 2:
        intervalMultiPath(api);
        break;
      default:
        multiPath(api);
        break;
    }
  }

  function stopSolution() {
  }


  function multiPath (api) {
    var currentMove = {x:0, y:0};
    previousMoves.clear();
    
    var determinePath = true;
    var path =[];
    previousMoves.set(computePreviousMoveKey(currentMove), currentMove);
    while (determinePath) {
      let move = nextMove(api, currentMove).pop();

      if (move === undefined) {
        determinePath = false;
      } else {
        path.push(move);
        currentMove = move;
        previousMoves.set(computePreviousMoveKey(move), move);
      }
    }

    path.forEach(function (step) {
      api.move(step.direction);
    })
    previousMoves.clear();
  }

  function intervalMultiPath (api) {

    setTimeout(function run() {
        multiPath(api);
        setTimeout(run, 100);
      }, 100);
  }

  function computePreviousMoveKey(cell) {
    return cell.x + '-' + cell.y;
  }

  function nextMoves(cell) {
    return [cellDownCoordinates(cell), cellUpCoordinates(cell), cellRightCoordinates(cell), cellLeftCoordinates(cell)];
  }

  function cellDownCoordinates(cell) {
    return {x: cell.x + availableMoves.down.cell.x, y: cell.y + availableMoves.down.cell.y, direction: DIRS.down};
  }

  function cellUpCoordinates(cell) {
    return {x: cell.x + availableMoves.up.cell.x, y: cell.y + availableMoves.up.cell.y, direction: DIRS.up};
  }

  function cellRightCoordinates(cell) {
    return {x: cell.x + availableMoves.right.cell.x, y: cell.y + availableMoves.right.cell.y, direction: DIRS.right};
  }

  function cellLeftCoordinates(cell) {
    return {x: cell.x + availableMoves.left.cell.x, y: cell.y + availableMoves.left.cell.y, direction: DIRS.left};
  }


  function nextMove(api, cell) {
    var moves = [];
    var nextMoveSet = nextMoves(cell);
    console.log(nextMoveSet);
    
    nextMoveSet.forEach(function (move) {
      if (!alreadyMoved(move)) {
        let checkCell = {
          x: move.x,
          y: move.y
        };

        if (cellIsPath(api, checkCell)) {
          moves.push(move);
        } else if (cellIsDisappearing(api, checkCell)) {
          moves.push(move);
        } else if (cellIsFinish(api, checkCell))
         moves.push(move);
        }
    });
    return moves;
  }

  function cellIsPath(api, cell) {
    return api.getCellTypeFromOffset(cell) === CELL_TYPES.path;
  }

  function cellIsDisappearing(api, cell) {
    return api.getCellTypeFromOffset(cell) === CELL_TYPES.path;
  }

  function cellIsFinish(api, cell) {
    return api.getCellTypeFromOffset(cell) === CELL_TYPES.finish;
  }

  function alreadyMoved(cell) {
    return previousMoves.get(computePreviousMoveKey(cell)) !== undefined;
  }

  function nextMoveFinishes(api, cell) {
    console.log(cell);
    return api.getOutcomeFromOffset(cell.x, cell.y) === OUTCOMES.finish;
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
