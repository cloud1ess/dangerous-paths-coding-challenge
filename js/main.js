(function Main () {
  var rootContainer = Utils.createElement('div', null);
  var scenariosContainer = Utils.createElement('div', rootContainer);

  var gamePanel = createCanvasPanel();
  var game = Game(gamePanel);


  function createCanvasPanel () {
    var gameCanvas = Utils.createElement('canvas', rootContainer);
    gameCanvas.width = 600;
    gameCanvas.height = 600;

    return new Panel(null, gameCanvas, true);
  }
})()
