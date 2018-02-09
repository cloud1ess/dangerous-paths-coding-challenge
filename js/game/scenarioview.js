function ScenarioView (parentPanel) {

  var backgroundPanel = new Panel(parentPanel);
  var cellPanel = new Panel(parentPanel);
  var foregroundPanel = new Panel(parentPanel);
  var CELL_SIZE = 32;
  var STROKE = 1;
  var CANVAS_SIZE = 640;
  var HALF_CANVAS_SIZE = CANVAS_SIZE/2;

  var cellTypes = {
    0: '#e2e2e2',
    1: '#888888',
    p: '#0099cc',
    x: '#33cc33'
  }

  var xPos = 0, yPos = 0;
  var max = Math.ceil(CANVAS_SIZE/CELL_SIZE)

  while (yPos <= max) {
    renderCell(
      {type: '0', x: xPos, y: yPos },
      backgroundPanel
    );
    xPos ++
    if (xPos > max) {
      xPos = 0;
      yPos ++
    }
  }
  parentPanel.render();

  function renderCell (cell, panel) {
    panel.drawRect({
      x: (CELL_SIZE * cell.x) + STROKE,
      y: (CELL_SIZE * cell.y) + STROKE,
      wid: CELL_SIZE - (2 * STROKE),
      hei: CELL_SIZE - (2 * STROKE),
      colour: cellTypes[cell.type]
    })
  }

  function update (state) {
    var columns = Math.floor(Math.sqrt(state.length));
    cellPanel.clear();
    cellPanel.setPos({
      x: HALF_CANVAS_SIZE-(columns*CELL_SIZE*0.5),
      y: HALF_CANVAS_SIZE-(columns*CELL_SIZE*0.5)
    })
    var x, y;

    for (var i=0; i<state.cells.length; i++){
      renderCell(state.cells[i], cellPanel);
    }
    renderCell(state.playerCell, cellPanel);

    parentPanel.render();
  }

  function scenarioName (name) {
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
