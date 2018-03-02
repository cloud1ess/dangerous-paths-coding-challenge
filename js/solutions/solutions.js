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
    while (!finish && count < 100) {
      for (const dir in DIR_OFFSET) {
        if (prevMove && prevMove === dir) continue;

        if (api.getCellTypeFromOffset(DIR_OFFSET[dir]) === CELL_TYPES.path) {
          api.move(dir);
          prevMove = getOpposite(dir);
          break;
        }
        console.log(api.getOutcomeFromOffset(DIR_OFFSET[dir]));
        console.log(api.getCellTypeFromOffset(DIR_OFFSET[dir]));
      }
      if (api.getOutcomeFromOffset({ x: 0, y: 0 }) === OUTCOMES.finish) finish = true;
      count += 1;
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
