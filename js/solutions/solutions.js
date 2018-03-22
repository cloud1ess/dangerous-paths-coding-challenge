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

  async function runSolution(index, api) {
    console.clear();
    console.log("Running scenario: ", Scenarios[index].name);

    const sentinel = new Sentinel(api)
    const moves = sentinel.getMoves();

    const runner = new Runner(api, moves);
    const result = await runner.walk();
    console.log("Winner?  ", result);
  }

  function stopSolution() {}

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  };
}
