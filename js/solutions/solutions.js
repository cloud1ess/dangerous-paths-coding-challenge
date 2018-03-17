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

    var movesThatDontResultInDeath = {
      up: isNotDie(surroundings.up),
      right: isNotDie(surroundings.right),
      down: isNotDie(surroundings.down),
      left: isNotDie(surroundings.left),
    };

    if (movesThatDontResultInDeath.up && backTrack !== DIRS.up) {
      api.move(DIRS.up);
      backTrack = DIRS.down;
    } else if (movesThatDontResultInDeath.right && backTrack !== DIRS.right) {
      api.move(DIRS.right);
      backTrack = DIRS.left;
    } else if (movesThatDontResultInDeath.down && backTrack !== DIRS.down) {
      api.move(DIRS.down);
      backTrack = DIRS.up;
    } else if (movesThatDontResultInDeath.left && backTrack !== DIRS.left) {
      api.move(DIRS.left);
      backTrack = DIRS.right;
    }

    tryToMove(api, backTrack)
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
