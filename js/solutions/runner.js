class Runner {
  constructor(index, api) {
    this.api = api;
    this.speed = 100;
    this.currentPosition = { x: 0, y: 0 };
    this.finishPosition = Utility.findFinishPosition(api);
    this.checkpoints = Utility.findCheckpoints(api);

    this.target = this.checkpoints.length > 0 ? this.checkpoints.pop() : this.finishPosition;
  }

  async loop() {
    const nextMove = this.getNextMove();
    const outcome = this.api.getOutcomeFromOffset(DIR_OFFSET[nextMove]);

    if (nextMove && outcome !== OUTCOMES.die) {
      this.api.move(nextMove);
      this.currentPosition = Utility.addOffset(this.currentPosition, DIR_OFFSET[nextMove]);
      this.previousMove = nextMove;
    }

    const cellType = this.api.getCellTypeFromOffset(DIR_OFFSET[nextMove]);
    if (cellType === CELL_TYPES.disappearing) {
      await new Promise((resolve, reject) => setTimeout(resolve, this.speed/2));
      this.loop(this.api);
      return;
    }

    const currentCellType = this.api.getCellTypeFromOffset({ x: 0, y: 0 });
    if (currentCellType === CELL_TYPES.checkpoints) {
      this.target = this.checkpoints.length > 0 ? this.checkpoints.pop() : finishPosition;
      // TODO make add the filter
      // checkpoints.filter(cell => {
      //   return !(cell.x === currentPosition.x && cell.y === currentPosition.y);
      // });
    }

    const currentOutcome = this.api.getOutcomeFromOffset({ x: 0, y: 0 });
    if (this.checkpoints.length === 0 && currentOutcome === OUTCOMES.finish) return;
    if (currentOutcome === OUTCOMES.die) return;

    await new Promise((resolve, reject) => setTimeout(resolve, this.speed));
    this.loop(this.api);
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

      if (this.api.getCellTypeFromOffset(DIR_OFFSET[dir])) {
        const position = Utility.addOffset(this.currentPosition, DIR_OFFSET[dir]);
        const distance = Utility.delta(position, this.target);
        paths.push({ direction: dir, distance });
      }
    }

    return paths;
  }
}
