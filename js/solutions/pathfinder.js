class Pathfinder {
  constructor(grid) {
    this.easystar = new EasyStar.js();
    this.easystar.setGrid(grid);
    const acceptableTiles = Object.values(Utilities.tileTypes);
    this.easystar.setAcceptableTiles(acceptableTiles);
  }

  async findPath(scenario) {
    const pathFn = scenario.checkpoints
      ? this.multiStop.bind(this, scenario)
      : this.pathFinder.bind(this, scenario.start, scenario.finish);
    return await pathFn();
  }

  pathFinder(start, finish) {
    const promise = new Promise((resolve, reject) => {
      this.easystar.findPath(start.x, start.y, finish.x, finish.y, path => {
        return path ? resolve(path) : reject(new Error('Path is not quite right...'));
      });
    });
    this.easystar.calculate();
    return promise;
  }

  async multiStop(scenario) {
    const promises = [];
    let start = scenario.start;
    const checkpoints = [...scenario.checkpoints, scenario.finish];
    checkpoints.forEach(point => {
      promises.push(this.pathFinder(start, point));
      start = point;
    });

    const paths = await Promise.all(promises);
    return Utilities.mergePaths(paths);
  }
}
