function SolutionsMenu (parentElement, runScenario, viewScenario) {

  for (var i=0; i<Scenarios.length; i++) {
    scenarioButtons(i);
  }

  function scenarioButtons (index) {
    var container = Utils.createElement('div', parentElement)
    container.style = "padding:5px;"

		var scenarioIndex = Utils.createElement('span', container)
    scenarioIndex.innerText = "Scenario "+index
    scenarioIndex.style = "padding-right:5px;"

    var viewButton = Utils.createElement('button', container)
    buttonText = document.createTextNode('View')
    viewButton.appendChild(buttonText)
    viewButton.scenarioIndex = index
    viewButton.onclick = function (evt) {
      viewScenario(this.scenarioIndex);
    }

		var runButton = Utils.createElement('button', container)
    var buttonText = document.createTextNode('Run')
    runButton.appendChild(buttonText)
    runButton.scenarioIndex = index
    runButton.onclick = function (evt) {
      runScenario(this.scenarioIndex);
    }
  }
}
