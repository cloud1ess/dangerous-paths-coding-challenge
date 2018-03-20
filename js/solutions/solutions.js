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

  var history, intervalId

  function initHistory () {
    history = [{x:0, y:0}]
  }

  function getOutcomes (api) {
    return {
      up: api.getOutcomeFromOffset({x:0, y:-1}),
      down: api.getOutcomeFromOffset({x:0, y:1}),
      left: api.getOutcomeFromOffset({x:-1, y:0}),
      right: api.getOutcomeFromOffset({x:1, y:0})
    }
  }

  function getPositionRelativeToStart (direction) {
    var currentPositionRelativeToStart = history[history.length - 1]

    var offset = {
      up: {x:0, y:-1},
      down: {x:0, y:1},
      left: {x:-1, y:0},
      right: {x:1, y:0}
    }[direction]

    return {x: currentPositionRelativeToStart.x + offset.x, y: currentPositionRelativeToStart.y + offset.y}
  }

  function timesVisited (direction) {
    var position = getPositionRelativeToStart(direction)

    var count = 0

    for (var i = 0; i < history.length; i++) {
      if (history[i].x === position.x && history[i].y === position.y) {
        count += 1
      }
    }

    return count
  }

  function tryAllOutcomes (api, outcomes, revisitLimit) {
    for (var direction in outcomes) {
      if (outcomes[direction] === OUTCOMES.finish) {
        api.move(DIRS[direction])
        return OUTCOMES.finish
      }
    }

    for (var direction in outcomes) {
      if (outcomes[direction] === OUTCOMES.survive) {
        if (timesVisited(direction) <= revisitLimit) {
          api.move(DIRS[direction])
          history.push(getPositionRelativeToStart(direction))
          return OUTCOMES.survive
        }
      }
    }
  }

  function attemptMove (api, revisitLimit) {
    revisitLimit = revisitLimit || 0
    var outcomes = getOutcomes(api, outcomes)
    var newOutcome = tryAllOutcomes(api, outcomes, revisitLimit)

    if (newOutcome === OUTCOMES.finish) {
      return true
    } else if (newOutcome === OUTCOMES.survive) {
      return false
    } else if (revisitLimit < 100) { // arbitrarily give up after all moves resulting in survival have been tried 100 times
      return attemptMove(api, revisitLimit + 1)
    } else {
      return false
    }
  }

  function runSolution (index, api) {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }

    initHistory()

    intervalId = setInterval(function () {
      attemptMove(api)
    }, 50)
  }

  function stopSolution() {
    clearInterval(intervalId)
    intervalId = null
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
