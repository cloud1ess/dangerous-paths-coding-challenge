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

  var offsets = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
  }

  function attemptJourney(api) {
    var canMove = true;
    var moves = [];
    var pseudoPosition = {x:0, y:0};   
    var previous = undefined;     

    while (canMove) {
      // check all directions and see which are valid.
      var validDirections = checkForValidPaths(pseudoPosition, api);

      if (validDirections.length === 0) {
        canMove = false;
      }
      else {
    
        next = getNextMoveFromValidMoves(validDirections, previous);

        if (next) {
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
          if (finish) {
            moves.push(finish);
            canMove = false;
            executeJourney(moves, api);
            window.clearInterval(timer);
          }
        } else {
          canMove = false;
        }
      }
    }
  }

  function executeJourney(moves, api) {
    moves.forEach(move => {
      api.move(move);
    });

  }

  function getNextMoveFromValidMoves(validDirections, previous) {
    // if the direction is previous location, remove this
    if (validDirections.length !== 0) {
      next = validDirections.filter(function (direction) {
        return direction !== previous;
      })[0];
    }
    return next;
  }

  function getPreviousCell(direction) {
    if (direction === DIRS.right) {
      return DIRS.left;
    }
    if (direction === DIRS.left) {
      return DIRS.right;
    }
    if (direction === DIRS.up) {
      return DIRS.down;
    }
    if (direction === DIRS.down) {
      return DIRS.up;
    }
  }

  function checkForValidPaths(pseudoPosition, api) {
    var validPaths = [];
    if (api.getOutcomeFromOffset({ x: 1+pseudoPosition.x, y: 0+pseudoPosition.y }) === 'survive') {
      validPaths.push(DIRS.right);
    }
    if (api.getOutcomeFromOffset({ x: -1+pseudoPosition.x, y: 0+pseudoPosition.y }) === 'survive') {
      validPaths.push(DIRS.left);
    }
    if (api.getOutcomeFromOffset({ x: 0+pseudoPosition.x, y: 1+pseudoPosition.y }) === 'survive') {
      validPaths.push(DIRS.down);
    }
    if (api.getOutcomeFromOffset({ x: 0+pseudoPosition.x, y: -1+pseudoPosition.y }) === 'survive') {
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

  function runSolution(index, api) {

    timer = window.setInterval(function () {
      moves = attemptJourney(api);
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