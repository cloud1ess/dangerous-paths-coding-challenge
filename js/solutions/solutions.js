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
    const scenario = Object.assign({}, Scenarios[index]);
    const pathFinder = new SimplePathFinder(scenario);
    const walker = new Walker(api);
    const getOutcome = Utilities.getOutcome.bind(this, api);
    const walkPath = walk.bind(this, walker, getOutcome, index);
    try {
      const path = pathFinder.getPath(scenario);
      walkPath(path);
    } catch (error) {
      console.error(`💩 ${error}`);
    }
  }

  async function walk(walker, getOutcome, index, path) {
    try {
      const reachedGoal = await walker.takeWalk(path, getOutcome);
      console.info(`Scenario ${index + 1} 👍`);
    } catch (error) {
      console.error(`💩 ${error}`);
    }
  }

  function stopSolution() {
    console.clear();
  }
  return { runSolution, stopSolution };
}
