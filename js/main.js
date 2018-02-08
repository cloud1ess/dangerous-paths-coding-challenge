(function Main () {
  var rootContainer = Utils.createElement('div', null);
  var solutionsContainer = Utils.createElement('div', rootContainer);

  var gamePanel = createCanvasPanel();
  var game = Game(gamePanel);

  var solutions = Solutions(solutionsContainer, runScenario, viewScenario);

  function runScenario (index) {
    game.runScenario(index, false)

    return {
      move: game.move,
      getCellProperties: game.getCellProperties
    }
  }

  function viewScenario (index) {
    game.runScenario(index, true)
  }

  function createCanvasPanel () {
    var gameCanvas = Utils.createElement('canvas', rootContainer);
    gameCanvas.width = 600;
    gameCanvas.height = 600;

    return new Panel(null, gameCanvas, true);
  }
})()
