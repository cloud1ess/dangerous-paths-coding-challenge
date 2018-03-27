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

  function tryToMove (api, cameFrom) {
    var surroundings = lookAtSurroundings(api);

    if (surroundings.left === OUTCOMES.finish) {
      api.move(DIRS.left);
      return;
    }

    var newCameFrom;
    var chosenDirection = chooseDirection(surroundings);

    if (chosenDirection) {
      api.move(chosenDirection);
      newCameFrom = OPPOSITES[chosenDirection];
    }

    return newCameFrom || cameFrom;
  }

  function lookAtSurroundings (api) {
    var surroundings = {};
    surroundings[DIRS.up] = api.getOutcomeFromOffset(OFFSETS.up);
    surroundings[DIRS.right] = api.getOutcomeFromOffset(OFFSETS.right);
    surroundings[DIRS.down] = api.getOutcomeFromOffset(OFFSETS.down);
    surroundings[DIRS.left] = api.getOutcomeFromOffset(OFFSETS.left);

    return surroundings;
  }

  function chooseDirection (surroundings) {
    if (isSafeAndNotAStepBack(DIRS.up, surroundings)) {
      return DIRS.up;
    } else if (isSafeAndNotAStepBack(DIRS.right, surroundings)) {
      return DIRS.right;
    } else if (isSafeAndNotAStepBack(DIRS.down, surroundings)) {
      return DIRS.down;
    } else if (isSafeAndNotAStepBack(DIRS.left, surroundings)) {
      return DIRS.left;
    } else {
      return null;
    }
  }

  function isNotDie (outcome) {
    return outcome !== OUTCOMES.die;
  }

  function isSafeAndNotAStepBack (direction, surroundings) {
    return isNotDie(surroundings[direction]) && cameFrom !== direction;
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
