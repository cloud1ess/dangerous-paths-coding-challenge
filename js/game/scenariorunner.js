function ScenarioRunner(stateChange, win, loose) {
  var currentFrame
  var currentFrameIndex
  var paused
  var gridSize
  var playerPos
  var currentScenario
  var frameTimer

  function run (scenario) {
    currentScenario = scenario;
    gridSize = Math.floor(Math.sqrt(scenario[0].length));
    findPlayerPos(scenario[0]);

    currentFrameIndex = -1;
    progressAFrame()

    if (currentScenario.length > 1) {
      frameTimer = setInterval(progressAFrame, 2000);
    }
  }

  function progressAFrame () {
    currentFrameIndex++
    if (currentFrameIndex >= currentScenario.length) {
      currentFrameIndex = 0;
    }
    currentFrame = currentScenario[currentFrameIndex]
    if (currentFrameIndex === 0) {
      currentFrame = currentFrame.replace('p', '1');
    }
    triggerStateChange(findPlayerStr())
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
      right: {x:1, y:0}
    }
    var newCellPos = {
      x: playerPos.x + dirs[dir].x,
      y: playerPos.y + dirs[dir].y
    }

    playerPos = newCellPos;
    var playerPosStr = findPlayerStr();

    triggerStateChange(playerPosStr);

    if (!canSurviveOnCell(playerPosStr)) {
      loose();
      pause(true);
    } else if (isWinningCell(playerPosStr)){
      win();
      pause(true);
    }
  }

  function findPlayerStr () {
    return Math.min(currentFrame.length-1, Math.max(0,(playerPos.y * gridSize) + playerPos.x))
  }

  function canSurviveOnCell (playerIndex) {
    return currentFrame[playerIndex] !== '0'
  }

  function isWinningCell (playerIndex) {
    return currentFrame[playerIndex] === 'x'
  }

  function findPlayerPos (scenario) {
    var index = scenario.indexOf('p');
    playerPos = {
      x: index%gridSize,
      y: Math.floor(index/gridSize)
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
    reset: reset
  }
}
