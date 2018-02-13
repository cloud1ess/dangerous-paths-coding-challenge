function ScenarioRunner(stateChange, win, lose) {

  var FRAME_TIMER = 1000
  var DIRS = {
    up: {x:0, y:-1},
    down: {x:0, y:1},
    left: {x:-1, y:0},
    right: {x:1, y:0}
  }

  var paused
  var scenario
  var frameTimer
  var scenarioIndex

  function run (newScenario) {
    scenarioIndex = newScenario;
    scenario = Utils.copy(Scenarios[scenarioIndex]);
    scenario.frame = Math.floor(Math.random()*4)
    scenario.playerPos = {
      x: scenario.start.x,
      y: scenario.start.y
    }
    scenario.collapsed = [];
    progressAFrame();
    frameTimer = setInterval(progressAFrame, FRAME_TIMER);
  }

  function progressAFrame () {
    if (paused) return;

    scenario.frame++;

    stateHasUpdated();
  }

  function move (dir) {
    if (paused) return;

    var collapsingIndex = steppedOnACollapsingCell();
    if (collapsingIndex >= 0) {
      scenario.collapsed.push(collapsingIndex);
    }
    scenario.playerPos.x += DIRS[dir].x;
    scenario.playerPos.y += DIRS[dir].y;

    stateHasUpdated();
  }

  function stateHasUpdated () {
    scenario.frameCells = generateFrameCells();
    var outcome = getCellType(scenario.playerPos);
    if (outcome === 'empty') {
      pause();
      lose();
    } else if (outcome === 'finish') {
      pause();
      win();
    }
    stateChange(scenario);
  }

  function getCellType (pos) {
    if (positionsAreSame(pos, scenario.finish)) {
      return 'finish'
    }
    var frameCells = scenario.frameCells;

    for (var i=0; i<frameCells.length; i++) {
      if (positionsAreSame(pos, frameCells[i])) {
        return frameCells[i].type || 'path'
      }
    }
    return 'empty'
  }

  function getCellTypeFromOffset (offset) {
    offset = offset || {x:0, y:0};
    var pos = {
      x: scenario.playerPos.x + (offset.x || 0),
      y: scenario.playerPos.y + (offset.y || 0)
    }
    return getCellType(pos)
  }

  function generateFrameCells () {
    var original = Scenarios[scenarioIndex],
        frameCells = Utils.copy(original.path),
        cellToCheck,
        frame

    if (original.disappearing) {
      original.disappearing.forEach(function (disappearing) {
        frame = scenario.frame%disappearing.length
        if (disappearing[frame]){
          frameCells.push({
            x: disappearing[frame].x,
            y: disappearing[frame].y,
            type: 'dissapearing'
          });
        }
      });
    }

    if (original.collapsing) {
      original.collapsing.forEach(function (collapser, index) {
        if (scenario.collapsed.indexOf(index) === -1) {
          frameCells.push({
            x: collapser.x,
            y: collapser.y,
            type: 'collapser'
          });
        }
      });
    }

    return frameCells;
  }

  function steppedOnACollapsingCell () {
    var collapsings = scenario.collapsing;
    if (!collapsings) return -1;

    for (var i=0; i<collapsings.length; i++) {
      if (positionsAreSame(collapsings[i], scenario.playerPos)) {
        return i
      }
    }
    return -1;
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
    getCellTypeFromOffset: getCellTypeFromOffset
  }
}
