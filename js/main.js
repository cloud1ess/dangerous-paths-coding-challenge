(function Main () {
  var solutionsContainer = Utils.createElement('div', null);
  solutionsContainer.style = "display: inline-block; vertical-align: top; width:280px"

  var gamePanel = createCanvasPanel();
  var gameRunner = GameRunner(gamePanel, updateProgress)
  var progress = Progress();
  var solutionsMenu = SolutionsMenu(solutionsContainer, gameRunner.runAll, gameRunner.runScenario, gameRunner.viewScenario);

  updateProgress({})

  function updateProgress (data) {
    progress.update(data)
    solutionsMenu.update(progress.getProgress(), data.running);
  }

  function createCanvasPanel () {
    var gameCanvas = Utils.createElement('canvas', null);
    gameCanvas.width = 640;
    gameCanvas.height = 640;

    return new Panel(null, gameCanvas, true);
  }
})()
