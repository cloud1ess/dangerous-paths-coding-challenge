function Solutions() {
  // ------------------------------------------------------------
  //  Game Api
  // ------------------------------------------------------------
  //
  // api.move(dir <DIRS>)
  // api.getOutcomeFromOffset({x:1, y:0}) returns outcome <OUTCOMES>
  // api.getCellTypeFromOffset({x:1, y:0}) returns cellType <CELL_TYPES>
  //
  // Refer to constants.js for <data type>
  // Offset is the relative to the players position
  let runner 

  async function runSolution(index, api) {
    console.clear();
    console.log("Running scenario: ", Scenarios[index].name);

    const sentinel = new Sentinel(index, api)
    const moves = sentinel.getMoves();
    console.log('moves: ', moves);
    // runner = new Runner(index,api);
    // await runner.loop();
  }

  function stopSolution() {
    runner = null;
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  };
}
