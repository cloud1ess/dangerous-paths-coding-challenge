(function Main () {
  var solutionsContainer = Utils.createElement('div', null);
  solutionsContainer.style = "display: inline-block; vertical-align: top; width:280px"

  var gamePanel = createCanvasPanel();
  var game = Game(gamePanel, scenarioFinished);
  var solutions = Solutions();
  var scenariosProgress = ScenariosProgress();
  var solutionsMenu = SolutionsMenu(solutionsContainer, runAll, runScenario, viewScenario);
  solutionsMenu.update(scenariosProgress.getProgress());

  var currentScenario
  var timeout
  var runningAllCallback

  function runAll () {

    runningAllCallback = runNextScenario;
    var nextScenario = -1;
    var unlocked = scenariosProgress.getProgress().unlocked;
    scenariosProgress.runningAll();
    runNextScenario(true, true);

    function runNextScenario (won, ignore) {
      if (!ignore) {
        scenariosProgress.runAllResult(nextScenario, won);
      }
      nextScenario++;

      if (won && nextScenario <= unlocked && nextScenario < Scenarios.length) {
        runScenario(nextScenario);
      } else {
        solutionsMenu.update(scenariosProgress.getProgress());
        runningAllCallback = null
      }
    }
  }

  function runScenario (index, singleRun) {
    if (singleRun && runningAllCallback) {
      runningAllCallback = null;
    }

    if (currentScenario || currentScenario === 0) {
      solutions.stopSolution();
      scenarioFinished(false);
    }
    currentScenario = index;

    scenariosProgress.running(currentScenario);
    solutionsMenu.update(scenariosProgress.getProgress());
    game.runScenario(index, false)

    solutions.runSolution(index, {
      move: game.move,
      getCellTypeFromOffset: game.getCellTypeFromOffset
    });

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      scenarioFinished(false);
    }, 5000)
  }

  function scenarioFinished (won) {
    clearTimeout(timeout)
    if ((currentScenario || currentScenario === 0) && !runningAllCallback) {
      scenariosProgress.result(currentScenario, won);
      solutionsMenu.update(scenariosProgress.getProgress());
    }
    currentScenario = null;
    if (runningAllCallback) {
      runningAllCallback(won);
    }
  }

  function viewScenario (index) {
    if (runningAllCallback) {
      runningAllCallback = null;
    }
    if (currentScenario || currentScenario === 0) {
      solutions.stopSolution();
      scenarioFinished(false);
    }
    game.runScenario(index, true)
  }

  function createCanvasPanel () {
    var gameCanvas = Utils.createElement('canvas', null);
    gameCanvas.width = 640;
    gameCanvas.height = 640;

    return new Panel(null, gameCanvas, true);
  }
})()
