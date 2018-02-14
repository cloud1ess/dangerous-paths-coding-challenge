function GenerateFrameCells (scenarioIndex, frame, collapsed, checkpointsVisited) {
  var original = Scenarios[scenarioIndex],
      frameCells = Utils.copy(original.path),
      cellToCheck,
      disappearingFrame

  if (original.disappearing) {
    original.disappearing.forEach(function (disappearing) {
      disappearingFrame = frame%disappearing.length
      if (disappearing[disappearingFrame]){
        frameCells.push({
          x: disappearing[disappearingFrame].x,
          y: disappearing[disappearingFrame].y,
          type: 'dissapearing'
        });
      }
    });
  }

  if (original.collapsing) {
    original.collapsing.forEach(function (collapser, index) {
      if (collapsed.indexOf(index) === -1) {
        frameCells.push({
          x: collapser.x,
          y: collapser.y,
          type: 'collapser'
        });
      }
    });
  }

  if (original.checkpoints) {
    original.checkpoints.forEach(function (checkpoint, index) {
        frameCells.push({
          x: checkpoint.x,
          y: checkpoint.y,
          type: checkpointsVisited[index]? 'checkpoint_visited' : 'checkpoint'
        });
    });
  }

  return frameCells
}
