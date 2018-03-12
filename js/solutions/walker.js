class Walker {
  constructor(api) {
    this.api = api;
    this.delay = 500;
  }

  async takeWalk(path, getOutcome) {
    return await this.walk(getOutcome, path);
  }

  async walk(getOutcome, path) {
    const steps = [...path];
    if (!steps.length) {
      return true;
    }
    const direction = steps.shift();
    const outcome = getOutcome(direction);
    let wait = 0;
    if (outcome !== OUTCOMES.die) {
      this.api.move(direction);
    } else {
      steps.unshift(direction);
      wait = this.delay;
    }
    const _ = await Utilities.timeout(wait);
    return this.walk(getOutcome, steps);
  }
}
