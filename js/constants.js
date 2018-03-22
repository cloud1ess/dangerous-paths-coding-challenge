var DIRS = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
}
var CELL_TYPES = {
  path: 'path',
  disappearing: 'disappearing',
  collapsing: 'collapsing',
  checkpoints: 'checkpoints'
}
var OUTCOMES = {
  survive: 'survive',
  die: 'die',
  finish: 'finish'
}

var DIR_OFFSET = {
  down: { x: 0, y: 1 },
  up: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

var OPPOSITE = {
  up: "down",
  down: "up",
  left: "right",
  right: "left"
};

var GRID_MAX_SIZE = 10