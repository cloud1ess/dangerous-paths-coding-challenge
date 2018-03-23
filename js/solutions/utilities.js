class Utilities {
  static compare(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
  }

  static timeout(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  static isValidPoint(point) {
    return point.status === this.tileStatus.VALID;
  }

  static getPoint(x = 0, y = 0, path = [], status = null) {
    return { y, x, path, status };
  }

  static getStartPoint(x = 0, y = 0) {
    return this.getPoint(x, y, [], this.tileStatus.START);
  }

  static directionToOffset(direction) {
    return this.offsets[direction] || null;
  }

  static getOutcome(api, direction) {
    const point = Utilities.directionToOffset(direction);
    return api.getOutcomeFromOffset(point);
  }

  static get offsets() {
    return {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };
  }

  static get directions() {
    return Object.keys(this.offsets);
  }

  static isAlive(outcome) {
    return !this.isDead(outcome);
  }

  static isDead(outcome) {
    return outcome === OUTCOMES.die;
  }

  static isFinished(outcome) {
    return outcome === OUTCOMES.finish;
  }

  static toJSON(point) {
    return JSON.stringify({ x: point.x, y: point.y });
  }

  static findCheckpoints(api, maxColumns = 10, maxRows = 10) {
    const checkpoints = [];
    for (let x = -maxColumns; x < maxColumns; x++) {
      for (let y = -maxRows; y < maxRows; y++) {
        const point = { x, y };
        const cell = api.getCellTypeFromOffset(point);
        if (cell === CELL_TYPES.checkpoints) {
          checkpoints.push(point);
        }
      }
    }
    return checkpoints.sort((point1, point2) => point1.y > point2.y);
  }

  static get tileStatus() {
    return {
      INVALID: 0,
      VALID: 1,
      VISITED: 2,
      START: 3,
      FINISH: 4
    };
  }
}
