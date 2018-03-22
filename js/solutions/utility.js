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

  static addOffset(point, offset) {
    return { x: point.x + offset.x, y: point.y + offset.y };
  }

  

  static delta(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  static getOpposite(dir) {
    return OPPOSITE[dir];
  }

  static async wait(ms){
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  }
}
