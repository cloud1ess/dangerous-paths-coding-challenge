function ScenarioView (panel) {

  var gridPanel = new Panel(panel)
  var CELL_SIZE = 32
  var STROKE = 1
  var CANVAS_SIZE = 600
  var HALF_CANVAS_SIZE = CANVAS_SIZE/2

  var cellTypes = {
    0: '#e2e2e2',
    1: '#888888',
    p: '#0099cc',
    x: '#33cc33'
  }

  panel.drawStrokeRect({
    x: STROKE,
    y: STROKE,
    wid: CANVAS_SIZE - (2*STROKE),
    hei: CANVAS_SIZE - (2*STROKE),
    lineWidth: 2*STROKE,
    colour: '#888888'
  });
  panel.render();

  function renderCell (type, x, y) {
    gridPanel.drawRect({
      x: (CELL_SIZE * x) + STROKE,
      y: (CELL_SIZE * y) + STROKE,
      wid: CELL_SIZE - (2 * STROKE),
      hei: CELL_SIZE - (2 * STROKE),
      colour: cellTypes[type]
    })
  }

  function update (state) {
    gridPanel.clear();
    var columns = Math.floor(Math.sqrt(state.length));
    gridPanel.setPos({
      x: HALF_CANVAS_SIZE-(columns*CELL_SIZE*0.5),
      y: HALF_CANVAS_SIZE-(columns*CELL_SIZE*0.5)
    })
    var x, y;

    for (var i=0; i<state.length; i++){
      x = i%columns;
      y = Math.floor(i/columns);
      renderCell(state[i], x, y);
    }
    panel.render();
  }

  function scenarioName (name) {
    panel.drawText({
      text: name,
      x:6,
      y:40,
      font: "40px Arial",
      colour: '#444444',
    });
    panel.render();
  }

  function win () {
    panel.drawText({
      text: 'Win',
      x:6,
      y:124,
      font: "100px Arial",
      colour: '#444444',
    });
    panel.render();
  }

  function lose () {
    panel.drawText({
      text: 'Lose',
      x:6,
      y:124,
      font: "100px Arial",
      colour: '#444444',
    });
    panel.render();
  }

  function reset () {
    gridPanel.clear();
    panel.clear();
    panel.drawStrokeRect({
      x: STROKE,
      y: STROKE,
      wid: CANVAS_SIZE - (2*STROKE),
      hei: CANVAS_SIZE - (2*STROKE),
      lineWidth: 2*STROKE,
      colour: '#888888'
    });
    panel.render();
  }

  return {
    update: update,
    win: win,
    scenarioName: scenarioName,
    lose: lose,
    reset: reset
  }
}
