function ScenarioRunner(stateChange, win, lose) {

  var FRAME_TIMER = 1000
  var paused
  var scenario
  var frameTimer
  var scenarioIndex
  var DIRS = {
    up: {x:0, y:-1},
    down: {x:0, y:1},
    left: {x:-1, y:0},
    right: {x:1, y:0}
  }

  function run (newScenario) {
    scenarioIndex = newScenario;
    scenario = Utils.copy(Scenarios[scenarioIndex]);
    scenario.frame = -1
    scenario.playerPos = {
      x: scenario.start.x,
      y: scenario.start.y
    }
    progressAFrame();
    frameTimer = setInterval(progressAFrame, FRAME_TIMER);
  }

  function progressAFrame () {
    scenario.frame++;
    if (scenario.onMover) {
      scenario.playerPos = getNextMoverPos();
    }
    setAllRandomCells(Scenarios[scenarioIndex])

    stateHasUpdated();
  }

  function move (dir) {
    if (paused) {
      return;
    }
    scenario.playerPos.x += DIRS[dir].x
    scenario.playerPos.y += DIRS[dir].y

    stateHasUpdated();
  }

  function stateHasUpdated () {
    stateChange(scenario);
    var outcome = getCellType(scenario.playerPos);
    if (outcome === 'empty') {
      pause();
      lose();
    } else if (outcome === 'finish') {
      pause();
      win();
    }
    scenario.onMover = outcome === 'mover';
  }

  function getCellType (pos) {
    if (positionsAreSame(pos, scenario.finish)) {
      return 'finish'
    }
    var cells = scenario.cells, cellToCheck;
    for (var i=0; i<cells.length; i++) {
      cellToCheck = cells[i];
      if (Array.isArray(cellToCheck)) {
        cellToCheck = cellToCheck[scenario.frame%cellToCheck.length];
      }

      if (cellToCheck && positionsAreSame(pos, cellToCheck)) {
        if (isRandomCell()) {

        } else {

        }
        return Array.isArray(cells[i]) && !cellIsRandom() && !cellDissapears() ? 'mover' : 'path'
      }
    }
    return 'empty'
  }

  function whatsTheOutcome (dir) {
    var newPos = {
      x: scenario.playerPos.x + DIRS[dir].x,
      x: scenario.playerPos.y + DIRS[dir].y
    }
    return getCellType(newPos)
  }

  function getNextMoverPos () {
    var cells = scenario.cells,
        cellToCheck

    for (var i=0; i<cells.length; i++) {
      cellToCheck = cells[i];
      if (Array.isArray(cellToCheck) && positionsAreSame(scenario.playerPos, cellToCheck[Math.max(0,scenario.frame-1)%cellToCheck.length])) {
        return {
          x: cellToCheck[scenario.frame%cellToCheck.length].x,
          y: cellToCheck[scenario.frame%cellToCheck.length].y
        }
      }
    }
  }

  function setAllRandomCells (original) {
    var cells = original.cells,
        cellToCheck

    for (var i=0; i<cells.length; i++) {
      cellToCheck = cells[i];
      if (Array.isArray(cellToCheck) && cellToCheck.length === 1) {
        scenario.cells[i] = Math.random() > 0.5 ? cells[i][0] : null;
      }
    }
  }

  function positionsAreSame (pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  function pause () {
    paused = true;
    if (frameTimer) {
      clearInterval(frameTimer)
    }
  }

  function reset () {
    pause();
    currentFrame = null
    currentFrameIndex = null
    paused = null
    gridSize = null
    playerPos = null
    currentScenario = null
    frameTimer = null
  }

  return {
    run: run,
    move: move,
    reset: reset,
    whatsTheOutcome: whatsTheOutcome
  }
}
