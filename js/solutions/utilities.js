class Utilities {
  static copyGrid(grid) {
    return grid.map(row => [...row]);
  }

  static flatten(list) {
    return list.reduce((a, b) => a.concat(Array.isArray(b) ? this.flatten(b) : b), []);
  }

  static timeout(delay) {
    return new Promise((resolve, reject) => setTimeout(resolve, delay));
  }

  static isEndPoint(point) {
    return point.status === this.tileStatus.FINISH;
  }

  static isValidPoint(point) {
    return point.status === this.tileStatus.VALID;
  }

  static getPoint(x = 0, y = 0, path = [], status = null) {
    return { y, x, path, status };
  }

  static getStartPoint(x, y) {
    return this.getPoint(x, y, [], this.tileStatus.START);
  }


  static directionToPoint(direction) {
    return this.offsets[direction] || null;
  }

  static getOutcome(api, direction) {
    const point = Utilities.directionToPoint(direction);
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

  static get tileTypes() {
    return {
      WALKABLE: 1,
      DISAPPEARING: 2,
      COLLAPSING: 3,
      CHECKPOINTS: 4
    };
  }

  static get tileValues() {
    return Object.values(this.tileTypes);
  }

  static get tileStatus() {
    return {
      VALID: 1,
      INVALID: 2,
      VISITED: 3,
      BLOCKED: 4,
      START: 100,
      FINISH: 101
    };
  }
}
