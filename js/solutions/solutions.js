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

  var previous;
  var timer;

  var offsets = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
  }

  function getMovesAsFarAsPossible(api, startPosition) {
    var canMove = true;
    var moves = [];
    var pseudoPosition = startPosition;        

    while (canMove) {
      // check all directions and see which are valid.
      var validDirections = checkForValidPaths(pseudoPosition, api);

      if (validDirections === []) {
        canMove = false;
      }
      else {
        // if the direction is previous location, remove this
        if (validDirections !== []) {
          next = validDirections.filter(function (direction) {
            return direction !== previous;
          })[0];
        }

        // push the next direction to the moves array
        moves.push(next);

        //update the pseudoPosition;
        pseudoPosition.x += offsets[next].x;
        pseudoPosition.y += offsets[next].y;

        // update the previous direction
        previous = getPreviousCell(next);

        // check to see if finish is in one of the directions
        finish = checkForFinish(pseudoPosition, api);

        // if so, push that move too.
        //TODO: consider moving this up into main runSolution function.
        if (finish) {
          moves.push(finish);
          canMove = false;
          window.clearInterval(timer);
        }
      }
    }

    return moves;
  }

  function doMoves(moves, api) {
    moves.forEach(move => {
      api.move(move);
    });

  }

  function runSolution(index, api) {

    var currentPosition = {x:0, y:0};

    timer = window.setInterval(function () {

      moves = getMovesAsFarAsPossible(api, currentPosition);

      if(moves !== []) {
        doMoves(moves, api);
      }

    }, 100);

  }

  function getPreviousCell(direction) {
    if (direction == DIRS.right) {
      return DIRS.left;
    }
    if (direction == DIRS.left) {
      return DIRS.right;
    }
    if (direction == DIRS.up) {
      return DIRS.down;
    }
    if (direction = DIRS.down) {
      return DIRS.up;
    }
  }

  function checkForValidPaths(pseudoPosition, api) {
    var validPaths = [];
    if (api.getCellTypeFromOffset({ x: 1+pseudoPosition.x, y: 0+pseudoPosition.y })) {
      validPaths.push(DIRS.right);
    }
    if (api.getCellTypeFromOffset({ x: -1+pseudoPosition.x, y: 0+pseudoPosition.y })) {
      validPaths.push(DIRS.left);
    }
    if (api.getCellTypeFromOffset({ x: 0+pseudoPosition.x, y: 1+pseudoPosition.y })) {
      validPaths.push(DIRS.down);
    }
    if (api.getCellTypeFromOffset({ x: 0+pseudoPosition.x, y: -1+pseudoPosition.y })) {
      validPaths.push(DIRS.up);
    }
    return validPaths;
  }

  function checkForFinish(pseudoPosition, api) {
    if (api.getOutcomeFromOffset({ x: 1+pseudoPosition.x, y: 0+pseudoPosition.y }) === 'finish') {
      return DIRS.right;
    }
    if (api.getOutcomeFromOffset({ x: -1+pseudoPosition.x, y: 0+pseudoPosition.y }) === 'finish') {
      return DIRS.left;
    }
    if (api.getOutcomeFromOffset({ x: 0+pseudoPosition.x, y: 1+pseudoPosition.y }) === 'finish') {
      return DIRS.down;
    }
    if (api.getOutcomeFromOffset({ x: 0+pseudoPosition.x, y: -1+pseudoPosition.y }) === 'finish') {
      return DIRS.up;
    }
    return false;
  }

  function stopSolution() {

  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}