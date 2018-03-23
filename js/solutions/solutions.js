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

  function runSolution(index, api) {
    const pathFinder = new SimplePathFinder(api);
    const walker = new Walker(api);
    const walkPath = walk.bind(this, walker, index);
    try {
      const path = pathFinder.getPath();
      walkPath(path);
    } catch (error) {
      console.error(`💩 ${error}`);
    }
  }

  async function walk(walker, index, path) {
    try {
      const _ = await walker.takeWalk(path);
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
