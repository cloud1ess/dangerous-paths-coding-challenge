function SolutionsMenu (parentElement, runAll, runScenario, viewScenario) {

  function update (progress, running) {
    var unlocked = progress.unlocked;
    var passed = progress.passed;
    var highestUnlocked = progress.highestUnlocked;

    parentElement.innerHTML = '';

    var runButton = Utils.createElement('button', parentElement, ['runall_button']);
    var buttonText = document.createTextNode('Run All and Progess');
    runButton.appendChild(buttonText);
    runButton.onclick = function (evt) {
      runAll(unlocked);
    }

    for (var i=0; i<=highestUnlocked; i++) {
      scenarioButtons(i);
    }

    function scenarioButtons (index) {
      var backgroundColour = 'red';
      if (running === index) {
        backgroundColour = "purple"
      } else if (passed[index]) {
        backgroundColour = "green"
      }
      var container = Utils.createElement('div', parentElement, ['scenario_buttons_container', 'background_'+backgroundColour]);

      var scenarioIndex = Utils.createElement('span', container, ['scenario_text']);
      scenarioIndex.innerText = "Scenario "+(index+1)+": "+Scenarios[index].name;

      var viewButton = Utils.createElement('button', container, ['scenario_button'])
      buttonText = document.createTextNode('View')
      viewButton.appendChild(buttonText)
      viewButton.scenarioIndex = index
      viewButton.onclick = function (evt) {
        viewScenario(this.scenarioIndex);
      }

      var runButton = Utils.createElement('button', container, ['scenario_button'])
      var buttonText = document.createTextNode('Run')
      runButton.appendChild(buttonText)
      runButton.scenarioIndex = index
      runButton.onclick = function (evt) {
        runScenario(this.scenarioIndex, true);
      }
    }
  }

  return {
    update: update
  }
}
