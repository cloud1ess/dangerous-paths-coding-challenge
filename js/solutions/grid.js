class Grid {
  constructor(scenario) {
    this.grid = [];
    this.createGrid(scenario)
      .populateGrid(scenario)
      .addDisappearing(scenario)
      .addCollapsing(scenario)
      .addCheckpoints(scenario);
    return this.grid;
  }

  createGrid(scenario) {
    const rows = scenario.size.h;
    const cols = scenario.size.w;
    this.grid = Array.from(Array(rows), () => Array(cols).fill(0));
    return this;
  }

  populateGrid(scenario) {
    const path = scenario.path;
    return this.mapTiles(path, Utilities.tileTypes.WALKABLE);
  }

  addDisappearing(scenario) {
    const disappearing = scenario.disappearing || [];
    disappearing.map(array => {
      const point = this.locatePoint(array);
      this.setTileType(point, Utilities.tileTypes.DISAPPEARING);
    });
    return this;
  }

  addCollapsing(scenario) {
    const collapsing = scenario.collapsing || [];
    return this.mapTiles(collapsing, Utilities.tileTypes.COLLAPSING);
  }

  addCheckpoints(scenario) {
    const checkpoints = scenario.checkpoints || [];
    return this.mapTiles(checkpoints, Utilities.tileTypes.CHECKPOINTS);
  }

  mapTiles(tiles, tileType) {
    tiles.map(point => this.setTileType(point, tileType));
    return this;
  }

  setTileType(point, tileType) {
    if (point) {
      this.grid[point.y][point.x] = tileType;
    }
  }

  locatePoint(array) {
    return array.find(el => !!el);
  }
}
