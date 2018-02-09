function ScenarioRunner(stateChange, win, lose) {

  var FRAME_TIMER = 1000
  var paused
  var scenario

  function run (newScenario) {
    scenario = Utils.copy(newScenario);
    scenario.playerPos = {
      x: scenario.start.x,
      y: scenario.start.y
    }
    progressAFrame();
    frameTimer = setInterval(progressAFrame, FRAME_TIMER);
  }

  function progressAFrame () {
    currentFrameIndex++
    if (currentFrameIndex >= currentScenario.grid.length) {
      currentFrameIndex = 0;
    }
    currentFrame = currentScenario.grid[currentFrameIndex]

    move('stay');
  }

  function triggerStateChange (playerIndex) {
    var stateWithPlayerAdded = Utils.replaceCharAt(currentFrame, playerIndex, 'p');

    stateChange(stateWithPlayerAdded);
  }

  function pause () {
    paused = true;
    if (frameTimer) {
      clearInterval(frameTimer)
    }
  }

  function move (dir) {
    if (paused) {
      return;
    }
    var dirs = {
      up: {x:0, y:-1},
      down: {x:0, y:1},
      left: {x:-1, y:0},
      right: {x:1, y:0},
      stay: {x:0, y:0}
    }
    var newCellPos = {
      x: playerPos.x + dirs[dir].x,
      y: playerPos.y + dirs[dir].y
    }

    playerPos = newCellPos;
    var playerPosStr = convertPosToIndex(playerPos);

    triggerStateChange(playerPosStr);

    if (!canSurviveOnCell(playerPosStr)) {
      pause();
      lose();
    } else if (isWinningCell(playerPosStr)){
      pause();
      win();
    }
  }

  function convertPosToIndex (pos) {
    return Math.min(currentFrame.length-1, Math.max(0,(pos.y * gridSize) + pos.x))
  }

  function canSurviveOnCell (playerIndex) {
    return currentFrame[playerIndex] !== '0'
  }

  function isWinningCell (playerIndex) {
    return currentFrame[playerIndex] === 'x'
  }

  function getCellProperties (x, y) {
    var cell = currentFrame[convertPosToIndex({x:x, y:y})];

    switch (cell) {
      case '0': return 'die'; break;
      case '1': return 'live'; break;
      case 'x': return 'win'; break;
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
    pause: pause,
    move: move,
    reset: reset,
    getCellProperties: getCellProperties
  }
}
