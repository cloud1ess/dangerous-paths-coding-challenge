let finishPosition;
let currentPosition;
let previousMove;
let currentScenario;
let checkpoints;
let target;

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

  async function runSolution(index, api) {
    if (index === 6) console.clear();
    console.log("Running scenario: ", Scenarios[index].name);

    finishPosition = getFinishPosition(api);
    checkpoints = getCheckpoints(api);
    currentPosition = { x: 0, y: 0 };
    currentScenario = index;
    target = checkpoints.length > 0 ? checkpoints.pop() : finishPosition;
    if (index === 4) {
      currentPosition = { x: -1, y: 0 };
    }

    console.log(JSON.stringify(checkpoints));

    await loop(api);
  }

  async function loop(api) {
    console.log("*** loop ****");

    const nextMove = getNextMove(api);
    const outcome = api.getOutcomeFromOffset(DIR_OFFSET[nextMove]);

    console.log("outcome: ", outcome);
    if (nextMove && outcome !== OUTCOMES.die) {
      api.move(nextMove);
      currentPosition = addOffset(currentPosition, DIR_OFFSET[nextMove]);
      previousMove = nextMove;

      console.log("nextMove", nextMove);
      console.log("currentPosition", currentPosition);
      console.log("finishPosition", finishPosition);
    }

    const cellType = api.getCellTypeFromOffset(DIR_OFFSET[nextMove]);
    if (cellType === CELL_TYPES.disappearing) {
      await new Promise((resolve, reject) => setTimeout(resolve, 50));
      loop(api);
      return;
    }

    const currentCellType = api.getCellTypeFromOffset({ x: 0, y: 0 });
    if (currentCellType === CELL_TYPES.checkpoints) {
      console.log("pre: ", { checkpoints });
      target = checkpoints.length > 0 ? checkpoints.pop() : finishPosition;
      // checkpoints.filter(cell => {
      //   return !(cell.x === currentPosition.x && cell.y === currentPosition.y);
      // });
      console.log("post: ", { checkpoints });
    }

    const currentOutcome = api.getOutcomeFromOffset({ x: 0, y: 0 });
    if (checkpoints.length === 0 && currentOutcome === OUTCOMES.finish) return;
    if (currentOutcome === OUTCOMES.die) return;

    await new Promise((resolve, reject) => setTimeout(resolve, 10));
    loop(api);
  }

  function getNextMove(api) {
    const paths = findPaths(api);

    if (paths.length === 0) return Object.keys(DIRS)[Math.floor(Math.random() * 4)];
    if (paths.length > 1) {
      //return paths[Math.floor(Math.random() * paths.length)];
      minPath = paths.reduce((a, b) => (b.distance < a.distance ? b : a));
      console.log("paths", paths);
      console.log("minPath", minPath);

      return minPath.direction;
    }

    return paths.pop().direction;
  }

  function findPaths(api) {
    console.log("findPaths target: ", target);
    const paths = [];

    for (let dir in DIR_OFFSET) {
      if (getOpposite(previousMove) === dir) continue;

      if (api.getCellTypeFromOffset(DIR_OFFSET[dir])) {
        distance = delta(addOffset(currentPosition, DIR_OFFSET[dir]), target);
        paths.push({ direction: dir, distance });
      }
    }

    return paths;
  }

  function addOffset(point, offset) {
    console.log("add offset: ", point, offset);
    return { x: point.x + offset.x, y: point.y + offset.y };
  }

  function getCheckpoints(api) {
    var checkpoints = [];
    for (let x = -10; x < 10; x++) {
      for (let y = -10; y < 10; y++) {
        const cellType = api.getCellTypeFromOffset({ x, y });
        if (cellType === CELL_TYPES.checkpoints) {
          checkpoints.push({ x, y });
        }
      }
    }
    return checkpoints;
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

  function getOpposite(dir) {
    return OPPOSITE[dir];
  }

  function stopSolution() {}

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  };
}
