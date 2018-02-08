(function Main () {
  var solutionsContainer = Utils.createElement('div', null);
  solutionsContainer.style = "display: inline-block; vertical-align: top;"

  var gamePanel = createCanvasPanel();
  var game = Game(gamePanel);
  var solutionsMenu = SolutionsMenu(solutionsContainer, runScenario, viewScenario);
  var solutions = Solutions();

  function runScenario (index) {
    game.runScenario(index, false)
    solutions.runScenario(index, {
      move: game.move,
      getCellProperties: game.getCellProperties
    })
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
