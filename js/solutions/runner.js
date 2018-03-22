class Runner {
  constructor(api, moves, speed = 10) {
    this.nextMove;
    this.api = api;
    this.moves = moves;
    this.speed = speed;
  }

  async walk() {
    if (this.moves.length === 0) {
      const currentOutcome = this.api.getOutcomeFromOffset({ x: 0, y: 0 });
      if (currentOutcome === OUTCOMES.finish) return true;
      return false;
    }

    this.refreshNextMove();

    const nextOutcome = this.api.getOutcomeFromOffset(DIR_OFFSET[this.nextMove]);
    if (this.nextMove && nextOutcome !== OUTCOMES.die) {
      this.api.move(this.nextMove);
      this.nextMove = null;
    }

    const currentCell = this.api.getCellTypeFromOffset({ x: 0, y: 0 });
    if (currentCell === CELL_TYPES.disappearing) {
      this.nextMove = null;
      this.refreshNextMove();
      this.api.move(this.nextMove);
      this.nextMove = null;
    }
    
    await Utility.wait(this.speed);
    return await this.walk(this.api);
  }

  refreshNextMove() {
    this.nextMove = !this.nextMove ? this.moves.shift() : this.nextMove;
  }
}
