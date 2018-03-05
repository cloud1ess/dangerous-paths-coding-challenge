var Scenarios = [
  {
    name: 'Path',
    start:{x:0, y:0},
    finish:{x:4, y:3},
    size: {w:5, h:4},
    path: [
      {x: 0, y: 0},
      {x: 0, y: 1},
      {x: 0, y: 2},
      {x: 1, y: 2},
      {x: 2, y: 2},
      {x: 2, y: 1},
      {x: 3, y: 1},
      {x: 4, y: 1},
      {x: 4, y: 2},
      {x: 4, y: 3}
    ]
  },
  {
    name: 'Multi',
    start:{x:3, y:0},
    finish:{x:0, y:4},
    size: {w:6, h:6},
    path: [
      {x: 3, y: 0},
      {x: 3, y: 1},
      {x: 3, y: 2},
      {x: 2, y: 2},
      {x: 1, y: 2},
      {x: 1, y: 3},
      {x: 1, y: 4},
      {x: 0, y: 4},
      {x: 4, y: 1},
      {x: 5, y: 1},
      {x: 5, y: 2},
      {x: 5, y: 3},
      {x: 5, y: 4},
      {x: 5, y: 5},
      {x: 4, y: 5},
      {x: 3, y: 5},
      {x: 2, y: 5},
      {x: 1, y: 5},
      {x: 1, y: 5},
      {x: 3, y: 3},
      {x: 4, y: 3},
    ]
  },
  {
    name: 'Disappearing',
    start:{x:0, y:0},
    finish:{x:4, y:4},
    size: {w:6, h:5},
    path: [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 1, y: 2},
      {x: 3, y: 2},
      {x: 3, y: 1},
      {x: 5, y: 1},
      {x: 5, y: 2},
      {x: 5, y: 3},
      {x: 5, y: 4},
      {x: 4, y: 4}
    ],
    disappearing: [
      [null,{x: 2, y: 2}],
      [null,{x: 4, y: 1}]
    ]
  },
  {
    name: 'Timings',
    start:{x:4, y:2},
    finish:{x:4, y:4},
    size: {w:9, h:8},
    path: [
      {x: 4, y: 2},
      {x: 2, y: 2},
      {x: 2, y: 1},
      {x: 2, y: 0},
      {x: 1, y: 0},
      {x: 0, y: 0},
      {x: 0, y: 1},
      {x: 0, y: 2},
      {x: 0, y: 4},
      {x: 0, y: 5},
      {x: 0, y: 6},
      {x: 1, y: 6},
      {x: 2, y: 6},
      {x: 2, y: 5},
      {x: 2, y: 4},
      {x: 4, y: 4},
      {x: 6, y: 2},
      {x: 6, y: 1},
      {x: 6, y: 0},
      {x: 7, y: 0},
      {x: 8, y: 0},
      {x: 8, y: 1},
      {x: 8, y: 2},
      {x: 8, y: 4},
      {x: 8, y: 5},
      {x: 8, y: 6},
      {x: 7, y: 6},
      {x: 6, y: 6},
      {x: 6, y: 5},
      {x: 6, y: 4}
    ],
    disappearing: [
      [null, null, {x: 6, y: 3}, null],
      [null, null, {x: 2, y: 3}, null],
      [{x: 3, y: 2}, null],
      [null,{x: 0, y: 3}],
      [{x: 3, y: 4}, null],
      [{x: 5, y: 2}, null],
      [null,{x: 8, y: 3}],
      [{x: 5, y: 4}, null]
    ]
  },
  {
    name: 'Collapsing',
    start:{x:0, y:1},
    finish:{x:8, y:1},
    size: {w:10, h:3},
    path: [
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 1, y: 0},
      {x: 1, y: 2},
      {x: 7, y: 0},
      {x: 7, y: 2},
      {x: 7, y: 1},
      {x:8, y:1}
    ],
    collapsing: [
      {x: 2, y: 0},
      {x: 3, y: 0},
      {x: 5, y: 0},
      {x: 6, y: 0},
      {x: 2, y: 2},
      {x: 3, y: 2},
      {x: 5, y: 2},
      {x: 6, y: 2}
    ],
    disappearing: [
      [{x: 4, y: 0}, null],
      [null, {x: 4, y: 2}]
    ]
  },
  {
    name: 'Commitment',
    start:{x:6, y:6},
    finish:{x:12, y:2},
    size: {w:14, h:13},
    path: [
      {x:6, y:6},

      {x:6, y:4},
      {x:5, y:4},
      {x:5, y:2},
      {x:4, y:2},
      {x:4, y:1},
      {x:4, y:0},
      {x:3, y:0},
      {x:2, y:0},

      {x:6, y:8},
      {x:7, y:8},
      {x:7, y:10},
      {x:8, y:10},
      {x:8, y:11},
      {x:8, y:12},
      {x:9, y:12},
      {x:10, y:12},

      {x:4, y:6},
      {x:4, y:7},
      {x:2, y:7},
      {x:2, y:8},
      {x:1, y:8},
      {x:0, y:8},
      {x:0, y:9},
      {x:0, y:10},

      {x:8, y:6},
      {x:8, y:5},
      {x:10, y:5},
      {x:10, y:4},
      {x:11, y:4},
      {x:12, y:4},
      {x:12, y:2},
      {x:12, y:3}
    ],
    disappearing: [
      [null, null, {x:6, y:7}, {x:6, y:7}],
      [{x:6, y:5}, {x:6, y:5}, null, null],
      [{x:5, y:6}, null, null, {x:5, y:6}],
      [null, {x:7, y:6}, {x:7, y:6}, null]
    ],
    collapsing: [
      {x:9, y:5},
      {x:3, y:7},
      {x:5, y:3},
      {x:7, y:9}
    ]
  },
  {
    name: 'Checkpoints',
    start:{x:5, y:4},
    finish:{x:5, y:5},
    size: {w:11, h:11},
    path: [
      {x:5, y:4},
      {x:5, y:3},
      {x:5, y:2},
      {x:5, y:1},

      {x:5, y:5},
      {x:5, y:6},
      {x:5, y:7},
      {x:5, y:8},
      {x:5, y:9},

      {x:4, y:5},
      {x:3, y:5},
      {x:2, y:5},
      {x:1, y:5},

      {x:6, y:5},
      {x:7, y:5},
      {x:8, y:5},
      {x:9, y:5},

      {x:6, y:0},
      {x:7, y:0},
      {x:8, y:0},
      {x:9, y:0},

      {x:9, y:1},

      {x:4, y:0},
      {x:3, y:0},
      {x:2, y:0},
      {x:1, y:0},

      {x:1, y:1},

      {x:0, y:1},
      {x:0, y:2},
      {x:0, y:3},
      {x:0, y:4},
      {x:0, y:6},
      {x:0, y:7},
      {x:0, y:8},
      {x:0, y:9},

      {x:1, y:9},

      {x:1, y:10},
      {x:2, y:10},
      {x:3, y:10},
      {x:4, y:10},
      {x:6, y:10},
      {x:7, y:10},
      {x:8, y:10},
      {x:9, y:10},

      {x:9, y:9},

      {x:10, y:1},
      {x:10, y:2},
      {x:10, y:3},
      {x:10, y:4},
      {x:10, y:6},
      {x:10, y:7},
      {x:10, y:8},
      {x:10, y:9}
    ],
    disappearing: [
    ],
    collapsing: [
    ],
    checkpoints: [
      {x:5, y:0},
      {x:5, y:10},
      {x:0, y:5},
      {x:10, y:5}
    ]
  }
]
