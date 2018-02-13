(function Main () {
  var solutionsContainer = Utils.createElement('div', null);
  solutionsContainer.style = "display: inline-block; vertical-align: top;"

  var gamePanel = createCanvasPanel();
  var game = Game(gamePanel, scenarioFinished);
  var solutionsMenu = SolutionsMenu(solutionsContainer, runScenario, viewScenario);
  var solutions = Solutions();

  var currentScenario
  var nextScenario
  var timeout

  function runScenario (index, autoNext) {
    if (currentScenario || currentScenario === 0) {
      nextScenario = null;
      solutions.stopScenario();
      scenarioFinished(false);
    }
    currentScenario = index;
    if (autoNext && currentScenario+1 < Scenarios.length && solutions['runScenario'+(currentScenario+2)]) {
      nextScenario = currentScenario+1;
    } else {
      nextScenario = null;
    }
    game.runScenario(index, false)
    var solutionRunner = solutions['runScenario'+(index+1)];
    if (solutionRunner){
      solutionRunner({
        move: game.move,
        getCellTypeFromOffset: game.getCellTypeFromOffset
      });
    }
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      scenarioFinished(false);
    }, 10000)
  }

  function scenarioFinished (won) {
    clearTimeout(timeout)
    if (currentScenario || currentScenario === 0) {
      solutionsMenu.result(currentScenario, won);
    }
    currentScenario = null;
    if (nextScenario) {
      runScenario(nextScenario, true);
    }
  }

  function viewScenario (index) {
    solutions.stopScenario();
    game.runScenario(index, true)
  }

  function createCanvasPanel () {
    var gameCanvas = Utils.createElement('canvas', null);
    gameCanvas.width = 640;
    gameCanvas.height = 640;

    return new Panel(null, gameCanvas, true);
  }
})()
