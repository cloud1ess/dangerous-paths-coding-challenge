function Game(panel) {

  var view = ScenarioView(panel);
  var runner = ScenarioRunner(view.update, win, lose);
  var userInput

  function runScenario(index, userInputNeeded) {
    reset()
    runner.run(Scenarios[index]);
    if (userInputNeeded) {
      userInput = UserInput(runner.move);
    }
  }

  function win () {
    view.win();
  }

  function lose () {
    view.lose();
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
    getCellProperties: runner.getCellProperties,
    reset : reset
  }
}
