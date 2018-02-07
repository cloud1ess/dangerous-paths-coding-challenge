function ScenarioView (panel) {

  var gridPanel = new Panel(panel)
  var CELL_SIZE = 32
  var STROKE = 1

  var cellTypes = {
    0: '#e2e2e2',
    1: '#888888',
    p: '#0099cc',
    x: '#33cc33'
  }

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
    var x, y;

    for (var i=0; i<state.length; i++){
      x = i%columns;
      y = Math.floor(i/columns);
      renderCell(state[i], x, y);
    }
    gridPanel.render();
  }

  function reset () {
    gridPanel.clear();
  }

  return {
    update: update,
    reset: reset
  }
}
