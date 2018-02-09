var Scenarios = [
  {
    start:{x:2, y:1},
    size: {w:3, h:3},
    cells: [
      {x: 0, y: 0, type: '0'},
      {x: 0, y: 1, type: '0'},
      {x: 0, y: 2, type: '0'},
      {x: 1, y: 2, type: '0'},
      {x: 2, y: 2, type: 'x'}
    ]
  },
  {
    start:{x:1, y:0},
    size: {w:3, h:3},
    cells: [
      {x: 0, y: 0, type: '0'},
      [{x: 1, y: 1, type: '0'}, {x: 0, y: 1, type: '0'}],
      {x: 0, y: 2, type: '0'},
      {x: 1, y: 2, type: '0'},
      {x: 2, y: 2, type: 'x'}
    ]
    grid: [
      "01000010011x0000",
      "01000100011x0000"
    ]
  }
]
