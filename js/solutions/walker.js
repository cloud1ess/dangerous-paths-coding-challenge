class Walker {
  constructor(api, delay = 100) {
    this.api = api;
    this.delay = delay;
    this.getOutcome = Utilities.getOutcome.bind(this, api);
  }

  async takeWalk(path) {
    return await this.walk(path);
  }

  async walk(path) {
    const steps = [...path];
    if (!steps.length) {
      return true;
    }
    const direction = steps.shift();
    const outcome = this.getOutcome(direction);
    let wait = 0;
    if (Utilities.isAlive(outcome)) {
      this.api.move(direction);
    } else {
      steps.unshift(direction);
      wait = this.delay;
    }
    const _ = await Utilities.timeout(wait);
    return this.walk(steps);
  }
}
