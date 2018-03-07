let finishPosition;
let currentPosition;
let previousMove;
let currentScenario;
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
    if(index === 4) console.clear();
    console.log('Running scenario: ', Scenarios[index].name);

    finishPosition = getFinishPosition(api);
    currentPosition = { x: 0, y: 0 };
    currentScenario= index;

    if(index === 4) {
      currentPosition = { x: -1, y: 0 };
    }
    //setTimeout(() => loop(api), SPEED);
    loop(api)
  }

  function loop(api) {
    console.log('*** loop ****');
    const nextMove = getNextMove(api);
    const outcome = api.getOutcomeFromOffset(DIR_OFFSET[nextMove]);

    console.log('outcome: ', outcome);
    if (nextMove && outcome !== OUTCOMES.die) {

      api.move(nextMove);
      currentPosition = addOffset(currentPosition, DIR_OFFSET[nextMove]);
      previousMove = nextMove;

      console.log('nextMove', nextMove);
      console.log('currentPosition', currentPosition);
      console.log('finishPosition', finishPosition);
    }

    const currentOutcome = api.getOutcomeFromOffset({ x: 0, y: 0 });

    if (currentOutcome === OUTCOMES.finish) {
      return;
    };
    if (currentOutcome === OUTCOMES.die) return;

    const cellType = api.getCellTypeFromOffset(DIR_OFFSET[nextMove]);
    if (cellType === CELL_TYPES.disappearing) {
      if(currentScenario===4){
        console.log('xxxxx');
      }
      setTimeout(() => loop(api), 10);
      return;
    }

    setTimeout(() => loop(api), SPEED);
  }

  function addOffset(point, offset) {
    console.log('add offset: ', point, offset);
    return { x: point.x + offset.x, y: point.y + offset.y };
  }

  function getFinishPosition(api) {
    for (let x = -10; x < 10; x++) {
      for (let y = -10; y < 10; y++) {
        const outcome = api.getOutcomeFromOffset({ x, y });
        if (outcome === OUTCOMES.finish) {
          return { x, y };
        }
      }
    }
  }

  function delta(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function getNextMove(api) {
    const paths = [];
    console.log('getNextMove previousMove: ', previousMove);
    for (let dir in DIR_OFFSET) {
      if (getOpposite(previousMove) === dir) continue;

      if (api.getCellTypeFromOffset(DIR_OFFSET[dir])) {
        distance = delta(addOffset(currentPosition, DIR_OFFSET[dir]),finishPosition);
        if(distance === 1){
          console.log('DIR_OFFSET[dir]: ', dir, DIR_OFFSET[dir]);
          console.log('currentPosition: ', currentPosition);
          console.log('finishPosition: ', finishPosition);
        }
        paths.push({ direction: dir, distance });
      }
    }

    if(currentScenario===4){
      console.log('getNextMove');
    }

    if (paths.length === 0) return;

    if (paths.length > 1) {
      //return paths[Math.floor(Math.random() * paths.length)];
      minPath = paths.reduce((a, b) => (b.distance < a.distance ? b : a));
      console.log('paths', paths);
      console.log('minPath', minPath);
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
