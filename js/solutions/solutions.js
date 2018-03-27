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

  function resetScenarioState () {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    cameFrom = null;
  }

  var timeBetweenSteps = 100;

  // Public functions

  function runSolution (index, api) {
    resetScenarioState();

    intervalId = setInterval(function () {
      cameFrom = tryToMove(api, cameFrom);
      if (api.getOutcomeFromOffset() === OUTCOMES.finish) {
        stopSolution();
      }
    }, timeBetweenSteps);
  }

  function stopSolution() {
    resetScenarioState();
  }

  // Private functions

  function isNotDie (outcome) {
    return outcome !== OUTCOMES.die;
  }

  function tryToMove (api, cameFrom) {
    var newCameFrom;

    var surroundings = lookAtSurroundings(api);

    if (surroundings.left === OUTCOMES.finish) {
      api.move(DIRS.left);
      return;
    }

    if (isSafeAndNotAStepBack(DIRS.up, surroundings)) {
      api.move(DIRS.up);
      newCameFrom = OPPOSITES[DIRS.up];
    } else if (isSafeAndNotAStepBack(DIRS.right, surroundings)) {
      api.move(DIRS.right);
      newCameFrom = OPPOSITES[DIRS.right];
    } else if (isSafeAndNotAStepBack(DIRS.down, surroundings)) {
      api.move(DIRS.down);
      newCameFrom = OPPOSITES[DIRS.down];
    } else if (isSafeAndNotAStepBack(DIRS.left, surroundings)) {
      api.move(DIRS.left);
      newCameFrom = OPPOSITES[DIRS.left];
    }

    return newCameFrom || cameFrom;
  }

  function lookAtSurroundings (api) {
    return {
      up: api.getOutcomeFromOffset(OFFSETS.up),
      right: api.getOutcomeFromOffset(OFFSETS.right),
      down: api.getOutcomeFromOffset(OFFSETS.down),
      left: api.getOutcomeFromOffset(OFFSETS.left),
    };
  }

  function isSafeAndNotAStepBack (direction, surroundings) {
    return isNotDie(surroundings[direction]) && cameFrom !== direction;
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
