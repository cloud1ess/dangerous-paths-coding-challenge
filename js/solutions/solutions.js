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
    console.log("Running scenario: ", Scenarios[index].name);

    const runner = new Runner(index,api);
    
    if (index === 4) {
      currentPosition = { x: -1, y: 0 };
    }
    if (index === 5) {
      currentPosition = { x: -1, y: 0 };
    }
    await runner.loop();

    
  }

  function stopSolution() {}

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  };
}
