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
      var survivalMoves = getAllSurvivalMoves(pseudoPosition, api);

      if (survivalMoves.length) {
        next = filterSurvivalMoves(survivalMoves, previous);

        if (next) {
          moves.push(next);

          pseudoPosition.x += offsets[next].x;
          pseudoPosition.y += offsets[next].y;

          previous = getPreviousCell(next);

          finish = checkForFinish(pseudoPosition, api);
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
      else {
        canMove = false;
      }
    }
  }

  function executeJourney(moves, api) {
    moves.forEach(move => {
      api.move(move);
    });

  }

  function filterSurvivalMoves(validDirections, previous) {
    return validDirections.filter(function (direction) {
      return direction !== previous;
    })[0];
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

  function getAllSurvivalMoves(position, api) {
    var survive = [];
    if (api.getOutcomeFromOffset({ x: 1+position.x, y: 0+position.y }) === 'survive') {
      survive.push(DIRS.right);
    }
    if (api.getOutcomeFromOffset({ x: -1+position.x, y: 0+position.y }) === 'survive') {
      survive.push(DIRS.left);
    }
    if (api.getOutcomeFromOffset({ x: 0+position.x, y: 1+position.y }) === 'survive') {
      survive.push(DIRS.down);
    }
    if (api.getOutcomeFromOffset({ x: 0+position.x, y: -1+position.y }) === 'survive') {
      survive.push(DIRS.up);
    }
    return survive;
  }

  function checkForFinish(position, api) {
    if (api.getOutcomeFromOffset({ x: 1+position.x, y: 0+position.y }) === 'finish') {
      return DIRS.right;
    }
    if (api.getOutcomeFromOffset({ x: -1+position.x, y: 0+position.y }) === 'finish') {
      return DIRS.left;
    }
    if (api.getOutcomeFromOffset({ x: 0+position.x, y: 1+position.y }) === 'finish') {
      return DIRS.down;
    }
    if (api.getOutcomeFromOffset({ x: 0+position.x, y: -1+position.y }) === 'finish') {
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