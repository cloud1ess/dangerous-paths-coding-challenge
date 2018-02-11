function Game(panel, scenarioFinished) {

  var view = ScenarioView(panel);
  var runner = ScenarioRunner(view.update, win, lose);
  var userInput

  function runScenario(index, userInputNeeded) {
    reset()
    runner.run(index);
    view.scenarioName(index);
    if (userInputNeeded) {
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
    whatsTheOutcome: runner.whatsTheOutcome,
    reset : reset
  }
}
