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

  function isNotDie (outcome) {
    return outcome !== OUTCOMES.die;
  }

  function tryToMove (api, backTrack) {
    if (api.getOutcomeFromOffset() === OUTCOMES.finish) {
      return;
    }

    var surroundings = {
      up: api.getOutcomeFromOffset(OFFSETS.up),
      right: api.getOutcomeFromOffset(OFFSETS.right),
      down: api.getOutcomeFromOffset(OFFSETS.down),
      left: api.getOutcomeFromOffset(OFFSETS.left),
    };

    if (surroundings.left === OUTCOMES.finish) {
      api.move(DIRS.left);
      return DIRS.right;
    }

    if (isNotDie(surroundings.up) && backTrack !== DIRS.up) {
      api.move(DIRS.up);
      backTrack = DIRS.down;
    } else if (isNotDie(surroundings.right) && backTrack !== DIRS.right) {
      api.move(DIRS.right);
      backTrack = DIRS.left;
    } else if (isNotDie(surroundings.down) && backTrack !== DIRS.down) {
      api.move(DIRS.down);
      backTrack = DIRS.up;
    } else if (isNotDie(surroundings.left) && backTrack !== DIRS.left) {
      api.move(DIRS.left);
      backTrack = DIRS.right;
    } else {
      setTimeout(function () {
        tryToMove(api, backTrack)
      }, 100);
    }

    tryToMove(api, backTrack);
  }

  function runSolution (index, api) {
    tryToMove(api, null);
  }

  function stopSolution() {
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
