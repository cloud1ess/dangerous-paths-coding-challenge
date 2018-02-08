function Solutions (parentElement, runScenario, viewScenario) {

  for (var i=0; i<Scenarios.length; i++) {
    scenarioButtons(i);
  }

  function scenarioButtons (index) {
    var container = Utils.createElement('div', parentElement)

		var runButton = Utils.createElement('button', container)
    var buttonText = document.createTextNode('Run Scenario '+index)
    runButton.appendChild(buttonText)
    runButton.scenarioIndex = index
    runButton.onclick = function (evt) {
      var gameApi = runScenario(this.scenarioIndex);
      scenarioRunning(this.scenarioIndex, gameApi)
    }

    var viewButton = Utils.createElement('button', container)
    buttonText = document.createTextNode('View Scenario '+index)
    viewButton.appendChild(buttonText)
    viewButton.scenarioIndex = index
    viewButton.onclick = function (evt) {
      viewScenario(this.scenarioIndex);
    }

  }

  function scenarioRunning (index, api) {

  }

}
