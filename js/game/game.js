function Game(panel) {

  var view = ScenarioView(panel);
  var runner = ScenarioRunner(view.update, win, loose);
  var userInput

  runScenario(0, true);

  function runScenario(index, userInput) {
    runner.run(Scenarios[index]);
    if (userInput) {
      userInput = UserInput(runner.move);
    }
  }

  function win () {
    console.log("Win");
  }

  function loose () {
    console.log("Loose");
  }

  function reset() {
    view.reset();
    runner.reset();
    userInput.tearDown();
  }

  return {
    runScenario : runScenario,
    reset : reset
  }
}
