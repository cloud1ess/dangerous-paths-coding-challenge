function ScenariosProgress () {

  var passed = [];
  var unlocked = 0;
  var runningScenario;

  function result (index, pass) {
    runningScenario = null;
  }

  function runAllResult (index, pass) {
    result(index, pass);
    if (pass) {
      passed[index] = pass;
      unlocked = Math.min(index+1, Scenarios.length-1);
    }
  }

  function running (index) {
    if (runningScenario) {
      passed[runningScenario] = false;
    }
    runningScenario = index;
  }

  function runningAll () {
    passed = [];
  }

  function getProgress () {
    return {
      passed: Utils.copy(passed),
      running: runningScenario,
      unlocked: unlocked,
      highestUnlocked: highestUnlocked
    }
  }

  return {
    result: result,
    runAllResult: runAllResult,
    running: running,
    runningAll: runningAll,
    getProgress: getProgress
  }
}
