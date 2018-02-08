(function Main () {
  var solutionsContainer = Utils.createElement('div', null);
  solutionsContainer.style = "display: inline-block; vertical-align: top;"

  var gamePanel = createCanvasPanel();
  var game = Game(gamePanel, scenarioWon, scenarioLost);
  var solutionsMenu = SolutionsMenu(solutionsContainer, runScenario, viewScenario);
  var solutions = Solutions();

  var currentScenario

  function runScenario (index) {
    if (currentScenario || currentScenario === 0) {
      scenarioLost();
    }
    currentScenario = index;
    game.runScenario(index, false)
    solutions.runScenario(index, {
      move: game.move,
      getCellProperties: game.getCellProperties
    })
  }

  function scenarioWon () {
    if (currentScenario) {
      solutionsMenu.result(currentScenario, true);
    }
    currentScenario = null;
  }

  function scenarioLost () {
    if (currentScenario) {
      solutionsMenu.result(currentScenario, false);
    }
    currentScenario = null;
  }

  function viewScenario (index) {
    game.runScenario(index, true)
  }

  function createCanvasPanel () {
    var gameCanvas = Utils.createElement('canvas', null);
    gameCanvas.width = 600;
    gameCanvas.height = 600;

    return new Panel(null, gameCanvas, true);
  }
})()
