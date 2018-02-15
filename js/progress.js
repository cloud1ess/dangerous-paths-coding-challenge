function Progress () {

  var passed = [];
  var unlocked = 0;
  var highestUnlocked = 0;

  function update (data) {
    if (data.running === 'all') {
      passed = [];
    }
    if (data.result && data.result.won) {
      passed[data.result.index] = true;
      unlocked = Math.min(data.result.index+1, Scenarios.length-1);
      highestUnlocked = Math.max(highestUnlocked, unlocked);
    }
  }

  function getProgress () {
    return {
      passed: Utils.copy(passed),
      unlocked: unlocked,
      highestUnlocked: highestUnlocked
    }
  }

  return {
    update: update,
    getProgress: getProgress
  }
}
