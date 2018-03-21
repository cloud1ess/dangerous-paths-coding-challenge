class Sentinel {
  constructor(index, api) {
    this.api = api;
    this.speed = 100;
    this.currentPosition = { x: 0, y: 0 };
    this.finishPosition = Utility.findFinishPosition(api);
    this.checkpoints = Utility.findCheckpoints(api);
    this.target = this.checkpoints.length > 0 ? this.checkpoints.pop() : this.finishPosition;
    this.moves = [];
  }

  getMoves() {
    const nextMove = this.getNextMove();
    this.moves.push(nextMove);
    this.previousMove = nextMove;
    this.currentPosition = Utility.addOffset(this.currentPosition, DIR_OFFSET[nextMove]);

    const cellOutcome = this.api.getOutcomeFromOffset(this.currentPosition);
    if (cellOutcome === OUTCOMES.finish && this.checkpoints.length === 0) {
      return this.moves;
    }

    const cellType = this.api.getCellTypeFromOffset(this.currentPosition);
    if (cellType === CELL_TYPES.checkpoints) {
      this.checkpoints = this.checkpoints.filter(cell => {
        return !(cell.x === this.currentPosition.x && cell.y === this.currentPosition.y);
      });

      if (this.equal(this.target, this.currentPosition)) {
        this.target = this.checkpoints.length > 0 ? this.checkpoints.shift() : this.finishPosition;
      }
    }

    return this.getMoves();
  }

  equal(point1, point2) {
    return point1['x'] === point2['x'] && point1['y'] === point2['y'];
  }
  getNextMove() {
    const paths = this.findPaths();

    if (paths.length === 0) return Object.keys(DIRS)[Math.floor(Math.random() * 4)];

    if (paths.length > 1) {
      const minimumDistance = paths.reduce((a, b) => (b.distance < a.distance ? b : a));
      return minimumDistance.direction;
    }

    return paths[0].direction;
  }

  findPaths() {
    const paths = [];

    for (let dir in DIR_OFFSET) {
      if (Utility.getOpposite(this.previousMove) === dir) continue;

      if (this.api.getCellTypeFromOffset(Utility.addOffset(this.currentPosition, DIR_OFFSET[dir]))) {
        const position = Utility.addOffset(this.currentPosition, DIR_OFFSET[dir]);
        const distance = Utility.delta(position, this.target);
        paths.push({ direction: dir, distance });
      }
    }

    return paths;
  }
}
