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

  var offsets = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
  }

  function runSolution(index, api) {

    var ended = false;

    console.log('running soluton ' + index);

    do {
      var validDirections = checkForValidPaths(api);
      if (validDirections !== []) {
        next = validDirections.filter(function (direction) {
          return direction !== previous;
        })[0];

        console.log('Moving...' + next);
        api.move(next);
        previous = getPreviousCell(next);

        finish = checkForFinish(api);
        if (finish) {
          api.move(finish);
          ended = true;
        }
      }
    }
    while (!ended);
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

  function checkForValidPaths(api) {
    var validPaths = [];
    if (api.getCellTypeFromOffset({ x: 1, y: 0 })) {
      validPaths.push(DIRS.right);
    }
    if (api.getCellTypeFromOffset({ x: -1, y: 0 })) {
      validPaths.push(DIRS.left);
    }
    if (api.getCellTypeFromOffset({ x: 0, y: 1 })) {
      validPaths.push(DIRS.down);
    }
    if (api.getCellTypeFromOffset({ x: 0, y: -1 })) {
      validPaths.push(DIRS.up);
    }
    return validPaths;
  }

  function checkForFinish(api) {
    if (api.getOutcomeFromOffset({ x: 1, y: 0 }) === 'finish') {
      return DIRS.right;
    }
    if (api.getOutcomeFromOffset({ x: -1, y: 0 }) === 'finish') {
      return DIRS.left;
    }
    if (api.getOutcomeFromOffset({ x: 0, y: 1 }) === 'finish') {
      return DIRS.down;
    }
    if (api.getOutcomeFromOffset({ x: 0, y: -1 }) === 'finish') {
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