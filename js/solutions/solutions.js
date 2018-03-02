function Solutions() {
  // ------------------------------------------------------------
  //  Game Api
  // ------------------------------------------------------------
  //
  // api.move(dir <DIRS>)
  // api.getOutcomeFromOffset({x:1, y:0}}) returns outcome <OUTCOMES>
  // api.getCellTypeFromOffset({x:1, y:0}}) returns cellType <CELL_TYPES>
  //
  // Refer to constants.js for <data type>
  // Offset is the relative to the players position

  function runSolution(index, api) {
    var DIR_OFFSET = {
      down: { x: 0, y: 1 },
      up: { x: 0, y: -1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };

    var finish = false;
    var count = 0;
    var prevMove;

    while (!finish && count < 500) {
      var branches = [];
      for (const dir in DIR_OFFSET) {
        if (prevMove && prevMove === dir) continue;

        var cellType = api.getCellTypeFromOffset(DIR_OFFSET[dir]);
        if (cellType) {
          branches.push(dir);
        }
      }

      count += 1;

      if (branches.length === 0) continue;
      var nextMove = branches[0];

      if (branches.length > 1) {
        nextMove = branches[Math.floor(Math.random() * branches.length)];
      }

      var outcome = api.getOutcomeFromOffset(nextMove);
      console.log("nextMove outcome: ", outcome);
      if (outcome !== OUTCOMES.die) {
        console.log("move to: ", nextMove);
        api.move(nextMove);
        prevMove = getOpposite(nextMove);
      }

      var currentOutcome = api.getOutcomeFromOffset({ x: 0, y: 0 });
      if (currentOutcome === OUTCOMES.finish) finish = true;
      if (currentOutcome === OUTCOMES.die) break;
    }
  }

  function getOpposite(dir) {
    var opposite = {
      up: "down",
      down: "up",
      left: "right",
      right: "left"
    };

    return opposite[dir];
  }

  function stopSolution() {}

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  };
}
