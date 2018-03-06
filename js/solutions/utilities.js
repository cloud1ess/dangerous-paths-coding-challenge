class Utilities {
  static comparePoints(point1, point2) {
    return point1 && point2 && point1.x === point2.x && point1.y === point2.y;
  }

  static addPoints(point1 = { x: 0, y: 0 }, point2 = { x: 0, y: 0 }) {
    const point = Object.assign({}, point1);
    point.x += point2.x;
    point.y += point2.y;
    return point;
  }

  static mergePaths(paths) {
    return this.flatten(this.removeOverlaps(paths));
  }

  static flatten(list) {
    return list.reduce((a, b) => a.concat(Array.isArray(b) ? this.flatten(b) : b), []);
  }

  static removeOverlaps(paths) {
    return paths.map((path, index) => {
      const branch = [...path];
      if (index > 0) {
        branch.shift();
      }
      return branch;
    });
  }

  static findDirection(point, candidate) {
    for (const direction in this.offsets) {
      const move = this.offsets[direction];
      if (Utilities.matchMove(candidate, point, move)) {
        return direction;
      }
    }
    return null;
  }

  static pointsToDirections(path) {
    const points = [...path];
    let current = points.shift();
    return points.reduce((directions, point) => {
      directions.push(this.findDirection(current, point));
      current = point;
      return directions;
    }, []);
  }

  static matchMove(candidate, current, move) {
    return this.comparePoints(candidate, this.addPoints(current, move));
  }

  static directionToPoint(direction) {
    return this.offsets[direction] || null;
  }

  static get offsets() {
    return {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };
  }

  static get tileTypes() {
    return {
      WALKABLE: 1,
      DISAPPEARING: 2,
      COLLAPSING: 3,
      CHECKPOINTS: 4
    };
  }
}
