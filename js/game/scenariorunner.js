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
    if (scenario.onMover) {
      scenario.playerPos = getNextMoverPos();
    }
    scenario.frame++;
    scenario.frameCells = generateFrameCells();

    stateHasUpdated();
  }

  function move (dir) {
    if (paused) {
      return;
    }
    scenario.playerPos.x += DIRS[dir].x;
    scenario.playerPos.y += DIRS[dir].y;

    stateHasUpdated();
  }

  function stateHasUpdated () {
    var outcome = getCellType(scenario.playerPos);
    if (outcome === 'empty') {
      pause();
      lose();
    } else if (outcome === 'finish') {
      pause();
      win();
    }
    scenario.onMover = outcome === 'mover';
    stateChange(scenario);
  }

  function getCellType (pos) {
    if (positionsAreSame(pos, scenario.finish)) {
      return 'finish'
    }
    var frameCells = scenario.frameCells;

    for (var i=0; i<frameCells.length; i++) {
      if (positionsAreSame(pos, frameCells[i])) {
        return frameCells[i].mover? 'mover':'path'
      }
    }
    return 'empty'
  }

  function whatsTheOutcome (dir) {
    var newPos = {
      x: scenario.playerPos.x + DIRS[dir].x,
      x: scenario.playerPos.y + DIRS[dir].y
    }
    var map = {
      finish: 'win',
      path: 'live',
      mover: 'live',
      empty: 'die'
    }
    return map[getCellType(newPos)]
  }

  function getNextMoverPos () {
    var mover = scenario.mover;

    for(var i=0; i<mover.length; i++) {
      if (positionsAreSame(scenario.playerPos, mover[i][scenario.frame%mover[i].length])){
        return mover[i][(scenario.frame+1)%mover[i].length]
      }
    }
  }

  function generateFrameCells () {
    var original = Scenarios[scenarioIndex],
        frameCells = Utils.copy(original.path),
        cellToCheck,
        frame

    if (original.dissaprearing) {
      original.dissaprearing.forEach(function (dissaprearing) {
        frame = scenario.frame%dissaprearing.length
        if (dissaprearing[frame]){
          frameCells.push(dissaprearing[frame]);
        }
      });
    }

    if (original.random) {
      original.random.forEach(function (random) {
        if (Math.random() > 0.5){
          frameCells.push(random);
        }
      });
    }

    if (original.mover) {
      original.mover.forEach(function (mover) {
        frame = scenario.frame%mover.length;
        frameCells.push({
          x: mover[frame].x,
          y: mover[frame].y,
          mover: true
        });
      });
    }
    return frameCells;
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
