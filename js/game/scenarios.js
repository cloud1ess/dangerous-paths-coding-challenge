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
    name: 'Dissaprearing',
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
    dissaprearing: [
      [null,{x: 2, y: 2}],
      [{x: 4, y: 1},null]
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
    dissaprearing: [
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
    name: 'Random',
    start:{x:0, y:1},
    finish:{x:8, y:1},
    size: {w:10, h:3},
    path: [
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 1, y: 0},
      {x: 1, y: 2},
      {x: 3, y: 0},
      {x: 3, y: 1},
      {x: 3, y: 2},
      {x: 5, y: 1},
      {x: 5, y: 0},
      {x: 5, y: 2},
      {x: 7, y: 0},
      {x: 7, y: 2},
      {x: 7, y: 1}
    ],
    random: [
      {x: 2, y: 0},
      {x: 2, y: 2},
      {x: 3, y: 1},
      {x: 4, y: 1},
      {x: 6, y: 0},
      {x: 6, y: 2}
    ]
  },
  {
    name: 'Movers',
    start:{x:0, y:0},
    finish:{x:6, y:0},
    size: {w:7, h:1},
    path: [
      {x:0, y:0},
      {x:6, y:0}
    ],
    mover: [
      [{x:1, y:0}, {x:2, y:0}, {x:3, y:0}, {x:4, y:0}, {x:5, y:0}]
    ]
  }
]
