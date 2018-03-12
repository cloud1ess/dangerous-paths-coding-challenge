class SimplePathFinder {
  constructor(scenario) {
    this._grid = new Grid(scenario);
  }

  resetGrid() {
    return Utilities.copyGrid(this._grid);
  }

  getPath(scenario) {
    const pathFn = scenario.checkpoints
      ? this.multiStop.bind(this, scenario)
      : this.findPath.bind(this, scenario.start, scenario.finish);
    return pathFn();
  }

  findPath(start, finish) {
    this.grid = this.resetGrid();
    return this.quickestPath(start, finish);
  }

  multiStop(scenario) {
    const paths = [];
    let start = scenario.start;
    const checkpoints = [...scenario.checkpoints, scenario.finish];
    checkpoints.forEach(point => {
      paths.push(this.findPath(start, point));
      start = point;
    });
    return Utilities.flatten(paths);
  }

  quickestPath(start, finish) {
    this.addGoalTile(finish);

    const point = Utilities.getStartPoint(start.x, start.y);
    const queue = [point];
    let directions = Utilities.directions;

    while (queue.length > 0) {
      const nextPoint = queue.shift();

      for (let i = 0, n = directions.length; i < n; i++) {
        const direction = directions[i];
        const candidate = this.getAdjacentPoint(nextPoint, direction);
        if (Utilities.isEndPoint(candidate)) {
          return candidate.path;
        }
        Utilities.isValidPoint(candidate) && queue.push(candidate);
      }
    }

    throw new Error('No path found');
  }

  getAdjacentPoint(point, direction) {
    const path = [...point.path];
    path.push(direction);

    let y = point.y;
    let x = point.x;
    let offsets = Utilities.offsets;

    y += offsets[direction].y;
    x += offsets[direction].x;

    const candidate = Utilities.getPoint(x, y, path);
    candidate.status = this.getTileStatus(candidate);

    Utilities.isValidPoint(candidate) && this.addVisitedTile(candidate);

    return candidate;
  }

  addGoalTile(point) {
    return this.updateGrid(point, Utilities.tileStatus.FINISH);
  }

  addVisitedTile(point) {
    return this.updateGrid(point, Utilities.tileStatus.VISITED);
  }

  updateGrid(point, status) {
    this.grid[point.y][point.x] = status;
    return this.grid;
  }

  isOutOfBounds({ x, y }) {
    const rows = this.grid.length;
    const columns = this.grid[0].length;
    return x < 0 || x >= columns || y < 0 || y >= rows;
  }

  isGoal(point) {
    return this.grid[point.y][point.x] === Utilities.tileStatus.FINISH;
  }

  isAcceptableTile(point) {
    return Utilities.tileValues.includes(this.grid[point.y][point.x]);
  }

  getTileStatus(point) {
    return this.isOutOfBounds(point)
      ? Utilities.tileStatus.INVALID
      : this.isGoal(point)
        ? Utilities.tileStatus.FINISH
        : this.isAcceptableTile(point) ? Utilities.tileStatus.VALID : Utilities.tileStatus.BLOCKED;
  }
}
