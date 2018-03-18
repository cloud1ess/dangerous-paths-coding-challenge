var DIRS = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
};

var CELL_TYPES = {
  path: 'path',
  disappearing: 'disappearing',
  collapsing: 'collapsing',
  checkpoints: 'checkpoints'
};

var OUTCOMES = {
  survive: 'survive',
  die: 'die',
  finish: 'finish'
};

var OFFSETS = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }
};

var OPPOSITES = {};
OPPOSITES[DIRS.up] = DIRS.down;
OPPOSITES[DIRS.right] = DIRS.left;
OPPOSITES[DIRS.down] = DIRS.up;
OPPOSITES[DIRS.left] = DIRS.right;
