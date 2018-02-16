function Solutions () {

  // api.move(dir) dir = up/down/left/right
  // api.getCellTypeFromOffset({x:0, y:0}) returns 'path/collapser/dissapearing/checkpoint/finish/empty'

  var interval

  function runSolution (index, api) {
    if (interval) {
      window.clearInterval(interval);
      interval = null;
    }

    interval = window.setInterval(function () {
      var route = RouteFinder(api.getCellTypeFromOffset);
      if (route) {
        window.clearInterval(interval);
        interval = null;
        PerformRoute(route, api.move);
      }
    }, 110);
  }

  function stopSolution() {
    if (interval && interval !== 0) {
      window.clearInterval(interval);
      interval = null;
    }
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
