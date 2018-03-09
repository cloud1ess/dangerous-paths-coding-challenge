class Utility {
  static findFinishPosition(api) {
    for (let x = -10; x < 10; x++) {
      for (let y = -10; y < 10; y++) {
        const outcome = api.getOutcomeFromOffset({ x, y });
        if (outcome === OUTCOMES.finish) {
          return { x, y };
        }
      }
    }
  }
  static findCheckpoints(api) {
    var checkpoints = [];
    for (let x = -10; x < 10; x++) {
      for (let y = -10; y < 10; y++) {
        const cellType = api.getCellTypeFromOffset({ x, y });
        if (cellType === CELL_TYPES.checkpoints) {
          checkpoints.push({ x, y });
        }
      }
    }
    return checkpoints;
  }

  static findPaths(api) {
    console.log("findPaths target: ", target);
    const paths = [];

    for (let dir in DIR_OFFSET) {
      if (getOpposite(previousMove) === dir) continue;

      if (api.getCellTypeFromOffset(DIR_OFFSET[dir])) {
        distance = Utility.delta(addOffset(currentPosition, DIR_OFFSET[dir]), target);
        paths.push({ direction: dir, distance });
      }
    }

    return paths;
  }

  static addOffset(point, offset) {
    console.log("add offset: ", point, offset);
    return { x: point.x + offset.x, y: point.y + offset.y };
  }

  

  static delta(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  static getOpposite(dir) {
    return OPPOSITE[dir];
  }
}
