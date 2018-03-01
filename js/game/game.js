function Game(panel, scenarioFinished) {

  var view = GameView(panel);
  var runner = GameScenarioRunner(view.update, win, lose);
  var userInput

  function runScenario(index, enableUserInput) {
    reset()
    runner.run(index);
    view.scenarioName(index);
    if (enableUserInput) {
      userInput = UserInput(runner.move);
    }
  }

  function win () {
    view.win();
    scenarioFinished(true);
  }

  function lose () {
    view.lose();
    scenarioFinished(false);
  }

  function reset() {
    view.reset();
    runner.reset();
    if (userInput) {
      userInput.tearDown();
      userInput = null
    }
  }

  return {
    runScenario : runScenario,
    move: runner.move,
    getCellTypeFromOffset: runner.getCellTypeFromOffset,
    getOutcomeFromOffset: runner.getOutcomeFromOffset,
    reset : reset
  }
}
