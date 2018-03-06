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
    const grid = new Grid(scenario);
    const pathfinder = new Pathfinder(grid);
    const pathFound = navigatePath.bind(this, api, index);
    try {
      const path = await pathfinder.findPath(scenario);
      pathFound(path);
    } catch (error) {
      console.error(error);
    }
  }

  async function navigatePath(api, index, path) {
    const walker = new Walker(api);
    const reachedGoal = await walker.takeWalk(path);
    console.info(`Solution ${index + 1}:`, { reachedGoal });
  }

  function stopSolution() {}
  return { runSolution, stopSolution };
}
