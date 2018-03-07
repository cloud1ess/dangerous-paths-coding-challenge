var finishPosition;
var currentPosition;

function Solutions() {
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

  function runSolution(index, api) {
    finishPosition = getFinishPosition(api);
    currentPosition = { x: 0, y: 0 };

    console.log(index);
    loop(api);
  }

  function loop(api, previousMove) {
    var nextMove = getNextMove(api, previousMove);
    var outcome = api.getOutcomeFromOffset(DIR_OFFSET[nextMove]);

    console.log("nextMove outcome: ", outcome);
    console.log("nextMove: ", nextMove);

    if (nextMove && outcome !== OUTCOMES.die) {
      api.move(nextMove);
      currentPosition = addOffset(currentPosition, DIR_OFFSET[nextMove]);
      previousMove = getOpposite(nextMove);
    }

    var currentOutcome = api.getOutcomeFromOffset({ x: 0, y: 0 });

    if (currentOutcome === OUTCOMES.finish) return;
    if (currentOutcome === OUTCOMES.die) return;

    setTimeout(() => loop(api, previousMove), 10);
  }

  function addOffset(point, offset) {
    return { x: point.x + offset.x, y: point.y + offset.y };
  }

  function getFinishPosition(api) {
    for (var x = -10; x < 10; x++) {
      for (var y = -10; y < 10; y++) {
        var outcome = api.getOutcomeFromOffset({ x, y });
        if (outcome === OUTCOMES.finish) {
          return { x, y };
        }
      }
    }
  }

  function delta(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function getNextMove(api, previousMovie) {
    var paths = [];

    for (const dir in DIR_OFFSET) {
      if (previousMovie === dir) continue;

      if (api.getCellTypeFromOffset(DIR_OFFSET[dir])) {
        distance = delta(finishPosition, addOffset(currentPosition, DIR_OFFSET[dir]));
        paths.push({ direction: dir, distance });
      }
    }

    if (paths.length === 0) return "down";

    if (paths.length > 1) {
      //return paths[Math.floor(Math.random() * paths.length)];
      minPath = paths.reduce((a, b) => {
        console.log('p.distance < min ? p.distance : min -> ', b.distance < a.distance ? b : a);
        return b.distance < a.distance ? b : a});
      console.log(JSON.stringify(minPath.direction));
      return minPath.direction;
    }

    return paths.pop().direction;
  }

  function getOpposite(dir) {
    return OPPOSITE[dir];
  }

  function stopSolution() {}

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  };
}
