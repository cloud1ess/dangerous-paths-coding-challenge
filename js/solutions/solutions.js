function Solutions () {

  // ------------------------------------------------------------
  //  Game Api
  // ------------------------------------------------------------
  //
  // api.move(dir <DIRS>)
  // api.getOutcomeFromOffset({x:1, y:0}}) returns outcome <OUTCOMES>
  // api.getCellTypeFromOffset({x:1, y:0}}) returns cellType <CELL_TYPES>
  //
  // Refer to constants.js for <data type>
  // Offset is the relative to the players position

  var history;

  function getOutcomes (api) {
    return {
      up: api.getOutcomeFromOffset({x:0, y:-1}),
      down: api.getOutcomeFromOffset({x:0, y:1}),
      left: api.getOutcomeFromOffset({x:-1, y:0}),
      right: api.getOutcomeFromOffset({x:1, y:0})
    }
  }

  function getPosition (direction) {
    var previousIndex = history[history.length - 1]

    var change = {
      up: {x:0, y:-1},
      down: {x:0, y:1},
      left: {x:-1, y:0},
      right: {x:1, y:0}
    }[direction]

    return {x: previousIndex.x + change.x, y: previousIndex.y + change.y}
  }

  function beenThereBefore (direction) {
    var position = getPosition(direction)

    var count = 0

    for (var i = 0; i < history.length; i++) {
      if (history[i].x === position.x && history[i].y === position.y) {
        count += 1
      }
    }

    return count
  }

  function tryAllOutcomes (api, outcomes, tryRevisit) {
    for (var direction in outcomes) {
      if (outcomes[direction] === OUTCOMES.finish) {
        api.move(DIRS[direction])
        return OUTCOMES.finish
      }
    }

    for (var direction in outcomes) {
      if (outcomes[direction] === OUTCOMES.survive) {
        if (beenThereBefore(direction) <= tryRevisit) {
          api.move(DIRS[direction])
          history.push(getPosition(direction))
          return OUTCOMES.survive
        }
      }
    }
  }

  function attemptMove (api, retryCount) {
    var outcomes = getOutcomes(api, outcomes);
    var newOutcome = tryAllOutcomes(api, outcomes, retryCount)

    if (newOutcome === OUTCOMES.finish) {
      return true
    } else if (newOutcome === OUTCOMES.survive) {
      return false
    } else if (retryCount < 100) { // arbitrarily give up after all moves resulting in survival have been tried 100 times
      return attemptMove(api, retryCount + 1)
    } else {
      return false
    }
  }

  function runSolution (index, api) {
    history = [{x:0, y:0}]

    var intervalId = setInterval(function () {
      var done = attemptMove(api, 0)
      if (done) {
        clearInterval(intervalId)
      }
    }, 50)
  }

  function stopSolution() {
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
