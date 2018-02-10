function ScenarioRunner(stateChange, win, lose) {

  var FRAME_TIMER = 1000
  var paused
  var scenario
  var frameTimer

  function run (newScenario) {
    scenario = Utils.copy(Scenarios[newScenario]);
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
    move('stay');
  }

  function move (dir) {
    if (paused) {
      return;
    }
    if (scenario.onMover && dir === 'stay') {
      scenario.playerPos = getNextMoverPos(scenario.playerPos);

    } else if (dir !== 'stay'){
      var dirs = {
        up: {x:0, y:-1},
        down: {x:0, y:1},
        left: {x:-1, y:0},
        right: {x:1, y:0}
      }
      scenario.playerPos.x += dirs[dir].x
      scenario.playerPos.y += dirs[dir].y
    }

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

      if (positionsAreSame(pos, cellToCheck)) {
        return Array.isArray(cells[i])? 'mover':'path'
      }
    }
    return 'empty'
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
    getCellType: getCellType
  }
}
