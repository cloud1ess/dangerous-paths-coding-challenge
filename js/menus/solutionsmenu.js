function SolutionsMenu (parentElement, runScenario, viewScenario) {

  var passed = [];

  redraw()

  function redraw () {
    parentElement.innerHTML = '';

    for (var i=0; i<Scenarios.length; i++) {
      scenarioButtons(i);
    }

    function scenarioButtons (index) {
      var container = Utils.createElement('div', parentElement)
      container.style = "padding:5px;"

      var scenarioIndex = Utils.createElement('span', container)
      scenarioIndex.innerText = "Scenario "+index
      scenarioIndex.style = "padding-right:5px;font-size: 13pt;"

      if (passed.indexOf(index) >= 0) {
        scenarioIndex.style += "color: #37883a;"
      }

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

  function result (index, pass) {
    if (pass) {
      if (passed.indexOf(index) === -1) {
        passed.push(index);
      }
    } else {
      if (passed.indexOf(index) >= 0) {
        passed.splice(passed.indexOf(index), 1);
      }
    }

    redraw()
  }

  return {
    result: result
  }
}
