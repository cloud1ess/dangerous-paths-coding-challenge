function GameRunner (gamePanel, updateProgress) {

  var game = Game(gamePanel, scenarioFinished);
  var solutions = Solutions();

  var currentScenario
  var timeout
  var runningAllCallback

  function runAll (unlocked) {
    runningAllCallback = runNextScenario;
    var nextScenario = -1;

    currentScenario = null;
    solutions.stopSolution();
    updateProgress({
      running: 'all'
    });
    runNextScenario(true);

    function runNextScenario (won, finishedScenario) {
      nextScenario++;

      if (won && nextScenario <= unlocked && nextScenario < Scenarios.length) {
        runScenario(nextScenario, null, finishedScenario);
      } else {
        runningAllCallback = null
      }
    }
  }

  function runScenario (index, singleRun, stopSolution) {
    if (singleRun && runningAllCallback) {
      runningAllCallback = null;
    }
    if (currentScenario || currentScenario === 0) {
      solutions.stopSolution();
      scenarioFinished(false);
    }
    if (stopSolution) {
      solutions.stopSolution();
    }
    currentScenario = index;

    updateProgress({
      running: currentScenario
    })
    game.runScenario(index, false)

    solutions.runSolution(index, {
      move: game.move,
      getCellTypeFromOffset: game.getCellTypeFromOffset,
      getOutcomeFromOffset: game.getOutcomeFromOffset
    });

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      scenarioFinished(false);
    }, 5000)
  }

  function scenarioFinished (won) {
    clearTimeout(timeout);
    if (runningAllCallback) {
      updateProgress({
        running: 'none',
        result: {
          index: currentScenario,
          won: won,
        }
      })
      currentScenario = null;
      runningAllCallback(won, true);
    } else {
      currentScenario = null;
      updateProgress({
        running: 'none'
      });
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

  return {
    runAll: runAll,
    runScenario: runScenario,
    viewScenario: viewScenario
  }
}
