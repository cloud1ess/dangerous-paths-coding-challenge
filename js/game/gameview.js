function GameView (parentPanel) {

  var backgroundPanel = new Panel(parentPanel);
  var cellPanel = new Panel(parentPanel);
  var foregroundPanel = new Panel(parentPanel);
  var CELL_SIZE = 32;
  var STROKE = 1;
  var CANVAS_SIZE = 640;
  var HALF_CANVAS_SIZE = CANVAS_SIZE/2;

  var cellTypes = {
    death: '#e2e2e2',
    path: '#888888',
    player: '#0099cc',
    finish: '#33cc33',
    collapser: '#cc9966',
    dissapearing: '#c653c6',
    checkpoint_visited: '#ff9900',
    checkpoint: '#ff471a'
  }

  var xPos = 0, yPos = 0;
  var max = Math.ceil(CANVAS_SIZE/CELL_SIZE)

  while (yPos <= max) {
    renderCell(
      {type: 'death', x: xPos, y: yPos },
      backgroundPanel
    );
    xPos ++
    if (xPos > max) {
      xPos = 0;
      yPos ++
    }
  }
  parentPanel.render();

  function renderCell (cell, panel, type, shrink) {
    shrink = shrink || 0;
    panel.drawRect({
      x: (CELL_SIZE * cell.x) + STROKE + shrink,
      y: (CELL_SIZE * cell.y) + STROKE + shrink,
      wid: CELL_SIZE - (2 * (STROKE + shrink)),
      hei: CELL_SIZE - (2 * (STROKE + shrink)),
      colour: cellTypes[type || 'death']
    })
  }

  function update (scenarioState) {
    cellPanel.clear();
    cellPanel.setPos({
      x: HALF_CANVAS_SIZE-(Math.floor(scenarioState.size.w*0.5)*CELL_SIZE),
      y: HALF_CANVAS_SIZE-(Math.floor(scenarioState.size.h*0.5)*CELL_SIZE)
    })
    var x, y, cellToRender;

    for (var i=0; i<scenarioState.frameCells.length; i++){
      renderCell(scenarioState.frameCells[i], cellPanel, scenarioState.frameCells[i].type || 'path');
    }
    renderCell(scenarioState.finish, cellPanel, 'finish');
    renderCell(scenarioState.playerPos, cellPanel, 'player', 3);

    parentPanel.render();
  }

  function scenarioName (index) {
    var name = 'Scenario '+(index+1)+': '+Scenarios[index].name
    foregroundPanel.drawText({
      text: name,
      x:6,
      y:40,
      font: "40px Arial",
      colour: '#444444',
    });
    parentPanel.render();
  }

  function win () {
    foregroundPanel.drawText({
      text: 'Win',
      x:6,
      y:124,
      font: "100px Arial",
      colour: '#444444',
    });
    parentPanel.render();
  }

  function lose () {
    foregroundPanel.drawText({
      text: 'Lose',
      x:6,
      y:124,
      font: "100px Arial",
      colour: '#444444',
    });
    parentPanel.render();
  }

  function reset () {
    cellPanel.clear();
    foregroundPanel.clear();
    parentPanel.render();
  }

  return {
    update: update,
    win: win,
    scenarioName: scenarioName,
    lose: lose,
    reset: reset
  }
}
