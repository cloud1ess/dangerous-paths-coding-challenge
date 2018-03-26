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

  var intervalId;
  var cameFrom;

  function isNotDie (outcome) {
    return outcome !== OUTCOMES.die;
  }

  function tryToMove (api, cameFrom) {
    var newCameFrom;

    var surroundings = {
      up: api.getOutcomeFromOffset(OFFSETS.up),
      right: api.getOutcomeFromOffset(OFFSETS.right),
      down: api.getOutcomeFromOffset(OFFSETS.down),
      left: api.getOutcomeFromOffset(OFFSETS.left),
    };

    if (surroundings.left === OUTCOMES.finish) {
      api.move(DIRS.left);
      return;
    }

    if (isNotDie(surroundings.up) && cameFrom !== DIRS.up) {
      api.move(DIRS.up);
      newCameFrom = OPPOSITES[DIRS.up];
    } else if (isNotDie(surroundings.right) && cameFrom !== DIRS.right) {
      api.move(DIRS.right);
      newCameFrom = OPPOSITES[DIRS.right];
    } else if (isNotDie(surroundings.down) && cameFrom !== DIRS.down) {
      api.move(DIRS.down);
      newCameFrom = OPPOSITES[DIRS.down];
    } else if (isNotDie(surroundings.left) && cameFrom !== DIRS.left) {
      api.move(DIRS.left);
      newCameFrom = OPPOSITES[DIRS.left];
    }

    return newCameFrom || cameFrom;
  }

  function resetInterval () {
    clearInterval(intervalId);
    intervalId = null;
  }

  function runSolution (index, api) {
    if (intervalId) {
      resetInterval();
    }

    cameFrom = null;

    intervalId = setInterval(function () {
      cameFrom = tryToMove(api, cameFrom, index);
      if (api.getOutcomeFromOffset() === OUTCOMES.finish) {
        stopSolution();
      }
    }, 100);
  }

  function stopSolution() {
    resetInterval();
    cameFrom = null;
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
