class SimplePathFinder {
  constructor(api, columns = 14, rows = 13) {
    this._api = api;
    this._map = new Map();
    this.MAX_COLUMNS = columns;
    this.MAX_ROWS = rows;
  }

  getPath() {
    const checkpoints = Utilities.findCheckpoints(this._api, this.MAX_COLUMNS, this.MAX_ROWS);
    const pathFn = checkpoints.length
      ? this.multiStop.bind(this, checkpoints)
      : this.findPath.bind(this, { x: 0, y: 0 });
    return pathFn();
  }

  findPath(start, endPoint = null) {
    this._map.clear();
    return this.calculatePath(start, endPoint);
  }

  multiStop(checkpoints) {
    let start = { x: 0, y: 0 };

    const paths = [...checkpoints, null]
      .map(checkpoint => {
        const path = this.findPath(start, checkpoint);
        start = checkpoint;
        return path;
      })
      .reduce((path, section) => [...path, ...section], []);

    return paths;
  }

  calculatePath(start, endPoint) {
    const point = Utilities.getStartPoint(start.x, start.y);
    const queue = [point];
    const directions = Utilities.directions;

    while (queue.length > 0) {
      const nextPoint = queue.shift();
      for (let i = 0, n = directions.length; i < n; i++) {
        const direction = directions[i];
        const candidate = this.getAdjacentPoint(nextPoint, direction);
        if (this.isFinished(candidate, endPoint)) {
          return candidate.path;
        }
        Utilities.isValidPoint(candidate) && queue.push(candidate);
      }
    }
    throw new Error(`No path found ${count}`);
  }

  isFinished(point, endPoint = null) {
    return endPoint ? Utilities.compare(point, endPoint) : this.isGoal(point);
  }

  getAdjacentPoint(point, direction) {
    const path = [...point.path];
    path.push(direction);

    let y = point.y;
    let x = point.x;

    y += Utilities.offsets[direction].y;
    x += Utilities.offsets[direction].x;

    const candidate = Utilities.getPoint(x, y, path);
    candidate.status = this.getTileStatus(candidate);

    Utilities.isValidPoint(candidate) && this.flagVisited(candidate);
    return candidate;
  }

  flagVisited(point) {
    return this.updateMap(point, Utilities.tileStatus.VISITED);
  }

  updateMap(point, status) {
    return this._map.set(Utilities.toJSON(point), status).size;
  }

  isOutOfBounds({ x, y }) {
    return (
      x < -this.MAX_COLUMNS || x >= this.MAX_COLUMNS || y < -this.MAX_ROWS || y >= this.MAX_ROWS
    );
  }

  isGoal(point) {
    return Utilities.isFinished(this._api.getOutcomeFromOffset(point));
  }

  hasVisited(point) {
    return this._map.has(Utilities.toJSON(point));
  }

  isAcceptableTile(point) {
    return this._api.getCellTypeFromOffset(point) && !this.hasVisited(point);
  }

  getTileStatus(point) {
    const outOfBounds = this.isOutOfBounds(point);
    const goal = this.isGoal(point);
    const acceptable = this.isAcceptableTile(point);
    return outOfBounds
      ? Utilities.tileStatus.INVALID
      : goal
        ? Utilities.tileStatus.FINISH
        : acceptable ? Utilities.tileStatus.VALID : Utilities.tileStatus.INVALID;
  }
}
