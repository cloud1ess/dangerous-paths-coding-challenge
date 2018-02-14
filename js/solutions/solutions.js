function Solutions () {

  // api.move(dir) dir = up/down/left/right
  // api.getCellTypeFromOffset({x:0, y:0}) returns 'path/collapser/dissapearing/finish/empty'

  var interval

  function runScenario (api) {
    
    if (interval && interval !== 0) {
      clearInterval(interval);
    }
    interval = setInterval(function () {
      var route = RouteFinder(api.getCellTypeFromOffset);
      if (route) {
        PerformRoute(route, api.move);
        clearInterval(interval);
      }
    }, 110);
  }

  function stopScenario() {
    if (interval && interval !== 0) {
      clearInterval(interval);
    }
  }

  return {
    runScenario1: runScenario,
    runScenario2: runScenario,
    runScenario3: runScenario,
    runScenario4: runScenario,
    runScenario5: runScenario,
    runScenario6: runScenario,
    runScenario7: runScenario,
    runScenario8: runScenario,
    stopScenario: stopScenario
  }
}
