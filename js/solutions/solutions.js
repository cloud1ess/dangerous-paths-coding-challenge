function Solutions () {

  // api.move(dir) dir = up/down/left/right
  // api.getCellTypeFromOffset({x:0, y:0}) returns 'path/collapser/dissapearing/finish/empty'

  var interval
  var DIRS = {
    up: {x:0, y:-1},
    down: {x:0, y:1},
    left: {x:-1, y:0},
    right: {x:1, y:0}
  }

  function runScenario1(api){
    api.move('down');
    api.move('down');
    api.move('right');
    api.move('right');
    api.move('up');
    api.move('right');
    api.move('right');
    api.move('down');
    api.move('down');
  }

  function runScenario2(api){
    api.move('down');
    api.move('down');
    api.move('left');
    api.move('left');
    api.move('down');
    api.move('down');
    api.move('left');
  }

  function runScenario3(api){
    api.move('right');
    api.move('down');
    api.move('down');
    waitForPath('right', api, goRight);

    function goRight () {
      api.move('right');
      api.move('right');
      api.move('up');
      waitForPath('right', api, goRightMore);
    }

    function goRightMore () {
      api.move('right');
      api.move('right');
      api.move('down');
      api.move('down');
      api.move('down');
      api.move('left');
    }
  }

  function runScenario4(api){
    waitForPath('left', api, goLeft);

    function goLeft () {
      api.move('left');
      api.move('left');
      waitForPath('down', api, goDown);
    }

    function goDown () {
      api.move('down');
      api.move('down');
      waitForPath('right', api, goRight);
    }

    function goRight () {
      api.move('right');
      api.move('right');
    }
  }

  function runScenario5 (api) {
    api.move('right');
    api.move('up');
    waitForPath('right', api, goRight);

    function goRight () {
      api.move('right');
      api.move('right');
      api.move('down');
      waitForPath('right', api, goRightMore);
    }
    function goRightMore () {
      api.move('right');
      api.move('right');
      api.move('up');
      waitForPath('right', api, goRightEvenMore);
    }
    function goRightEvenMore () {
      api.move('right');
      api.move('right');
      api.move('down');
      api.move('right');
    }
  }

  function runScenario6 (api) {
    waitForPath('right', api, goRight);

    function goRight () {
      api.move('right');
      waitForPath('right', api, goRightMore);
    }
    function goRightMore () {
      api.move('right');
    }
  }

  function waitForPath (dir, api, callback) {
    clearInterval(interval);
    interval = setInterval(function () {
      if (api.getCellTypeFromOffset(DIRS[dir]) !== 'empty') {
        clearInterval(interval);
        callback();
      }
    }, 200)
  }

  function runScenario7 (api) {
    var visited = {
      '0x0':true
    };
    var outcome;
    var pos = {x:0, y:0},
        tempPos,
        strPos,
        dirsToTry = ['right', 'down', 'left', 'up']

    if (interval && interval !== 0) {
      clearInterval(interval);
    }
    interval = setInterval(function () {
      // Try and find a route to the finish

      // If there is one take it


      // for (var i=0; i< dirsToTry.length; i++) {
      //   outcome = api.getCellTypeFromOffset(DIRS[dirsToTry[i]]);
      //   tempPos = {
      //     x: pos.x + DIRS[dirsToTry[i]].x,
      //     y: pos.y + DIRS[dirsToTry[i]].y
      //   }
      //   strPos = tempPos.x+'x'+tempPos.y;
      //   if(outcome !== 'empty' && !visited[strPos]) {
      //     pos = tempPos;
      //     visited[strPos] = true;
      //     api.move(dirsToTry[i]);
      //     if (outcome === 'finish') {
      //       clearInterval(interval);
      //     }
      //     break;
      //   }
      // }
    }, 50);
  }

  function runScenario8 () {
  }

  function stopScenario() {
    if (interval && interval !== 0) {
      clearInterval(interval);
    }
  }

  return {
    runScenario1: runScenario7,
    runScenario2: runScenario7,
    runScenario3: runScenario7,
    runScenario4: runScenario7,
    runScenario5: runScenario7,
    runScenario6: runScenario7,
    runScenario7: runScenario7,
    runScenario8: runScenario7,
    stopScenario: stopScenario
  }
}
