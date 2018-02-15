function ScenariosProgress () {

  var unlocked = 0;

  function result (index, pass) {
    passed[index] = pass;

    unlocked = Math.max(checkUnlocked(), unlocked)
  }

  function checkUnlocked () {
    var progress = 0;

    for (var i=0; i<passed.length; i++) {
      if (passed[i] && i === progress) {
        progress++
      }
    }
    return progress
  }

  function getProgress () {
    return {
      passed: Utils.copy(passed),
      unlocked: unlocked
    }
  }

  return {
    result: result,
    getProgress: getProgress
  }
}
