function SolutionsMenu (parentElement, runAll, runScenario, viewScenario) {

  function update (progress) {
    var unlocked = progress.unlocked;
    var passed = progress.passed;
    var running = progress.running;
    var highestUnlocked = progress.highestUnlocked;

    parentElement.innerHTML = '';

    var runButton = Utils.createElement('button', parentElement);
    var buttonText = document.createTextNode('Run All and Progess');
    runButton.appendChild(buttonText);
    runButton.onclick = function (evt) {
      runAll();
    }

    for (var i=0; i<=highestUnlocked; i++) {
      scenarioButtons(i);
    }

    function scenarioButtons (index) {
      var container = Utils.createElement('div', parentElement);
      container.style = "padding:5px;";

      var scenarioIndex = Utils.createElement('span', container);
      scenarioIndex.innerText = "Scenario "+(index+1)+": "+Scenarios[index].name;

      var style = "padding-right:5px;font-size: 13pt;color: #efefef;background-color: "
      var backgroundColour = '#ff471a';

      if (running === index) {
        backgroundColour = "#c653c6"
      } else if (passed[index]) {
        backgroundColour = "#37883a"
      }
      style += backgroundColour
      scenarioIndex.style = style

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
        runScenario(this.scenarioIndex, true);
      }
    }
  }

  return {
    update: update
  }
}
