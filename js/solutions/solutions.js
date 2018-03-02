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
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
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
        if (cellType === CELL_TYPES.path || cellType === CELL_TYPES.disappearing) {
          branches.push(dir);
        }
        console.log(api.getOutcomeFromOffset(DIR_OFFSET[dir]));
        console.log(api.getCellTypeFromOffset(DIR_OFFSET[dir]));
      }

      count += 1;

      if (branches.length === 0) continue;
      var nextMove = branches[0];

      if (branches.length > 1) {
        nextMove = branches[Math.floor(Math.random() * branches.length)];
      }

      var cnt = 0;
      do {
        var outcome = api.getOutcomeFromOffset(DIR_OFFSET[nextMove]);
        cnt += 1;
      } while (outcome === OUTCOMES.die && cnt < 100);

      if(outcome !== OUTCOMES.die){
        api.move(nextMove);
        prevMove = getOpposite(nextMove);
      }

      if (api.getOutcomeFromOffset({ x: 0, y: 0 }) === OUTCOMES.finish) finish = true;
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
