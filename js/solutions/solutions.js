function Solutions () {

  // ------------------------------------------------------------
  //  Game Api
  // ------------------------------------------------------------
  //
  // api.move(dir <DIRS>)
  // api.getOutcomeFromOffset({x:1, y:0}) returns outcome <OUTCOMES>
  // api.getCellTypeFromOffset({x:1, y:0}) returns cellType <CELL_TYPES>
  //
  // Refer to constants.js for <data type>
  // Offset is the relative to the players position

  var previousMove = {x:0, y:0};
  var playerCells = [
    {x:-1, y:0},
    {x:0, y:0},
    {x:1, y:0},
    {x:-1, y:1},
    {x:1, y:1},
    {x:0, y:1},
    {x:1, y:-1},
    {x:0, y:-1}]


  function runSolution (index, api) {
    switch (index) {
      case 0: 
        simplePath(api);
        break;
      case 1:
        multiPath(api);
        break;
      default:
        break;
    }
  }

  function stopSolution() {
  }

  function simplePath (api) {
    api.move(DIRS.down);
    api.move(DIRS.down);
    api.move(DIRS.right);
    api.move(DIRS.right);
    api.move(DIRS.up);
    api.move(DIRS.right);
    api.move(DIRS.right);
    api.move(DIRS.down);
    api.move(DIRS.down);
  }

  function multiPath (api) {
    var running = true;
    while (running) {
      var move = validDirection(api)
      api.move(move);
      previousMove = move;  
      if (getNextOutcomes(api).includes(OUTCOMES.finish)) {
        running = false;
      }
    }
  }

  function getNextOutcomes(api) {

  }

  function nextPathDirection (api) {
    var directions = [];
    playerCells.forEach(function (cell){
      if (api.getCellTypeFromOffset(cell) === CELL_TYPES.path) {
        directions.push(cell);
      }
    });
    return directions;
  } 

  function validDirection (api) {
    var pathDirections = nextPathDirection(api);
    pathDirections.forEach(function (cell) {
      if (cell.x !== previousMove.x && cell.y !== previousMove.y) {
        return cell;
      }
    });
  }

  // TODO: will be needed to check whether a path is valid to travel.
  // Correction: This can be thought of a shortest path problem. Graph algorithms ahoy! Check out some maze running algorithms too. 
  // Depth first search, breadth first seach, greedy algos etc.

  function isPathTraversable () {}

  function pathDirection() {}

  function isUp () {}

  function isDown () {}

  function isRight () {}

  function isLeft () {}

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
