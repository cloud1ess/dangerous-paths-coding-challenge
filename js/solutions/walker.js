class Walker {
  constructor(api) {
    this.api = api;
  }

  timeout(delay) {
    return new Promise((resolve, reject) => setTimeout(resolve, delay));
  }

  async takeWalk(path) {
    const directions = Utilities.pointsToDirections(path);
    return await this.walk(directions);
  }

  async walk(directions) {
    const steps = [...directions];
    if (!steps.length) {
      return true;
    }
    const direction = steps.shift();
    const outcome = this.getOutcome(direction);
    let wait = 0;
    if (outcome !== OUTCOMES.die) {
      this.api.move(direction);
    } else {
      steps.unshift(direction);
      wait = 1000;
    }
    const _ = await this.timeout(wait);
    return this.walk(steps);
  }

  getOutcome(direction) {
    const point = Utilities.directionToPoint(direction);
    return this.api.getOutcomeFromOffset(point);
  }
}
