var OFFSETS = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    down: { x: 0, y: 1 },
    up: { x: 0, y: -1 },
};

function AttemptJourney(api) {

    var canMove = true;
    var moves = [];
    var pseudoPosition = {x:0, y:0};   
    var previous = undefined;     

    while (canMove) {
      var survivalMoves = getDirectionsOfOutcome(pseudoPosition, OUTCOMES.survive, api);

      if (survivalMoves.length) {
        next = filterSurvivalMoves(survivalMoves, previous);

        if (next) {
          moves.push(next);

          pseudoPosition.x += OFFSETS[next].x;
          pseudoPosition.y += OFFSETS[next].y;

          previous = getPreviousCell(next);

          finish = getDirectionsOfOutcome(pseudoPosition, OUTCOMES.finish, api);
          if (finish.length) {
            moves.push(finish);
            canMove = false;
            executeJourney(moves, api);
          }
        } else {
          canMove = false;
        }
      }
      else {
        canMove = false;
      }
    }
}

function getDirectionsOfOutcome(position, outcome, api) {
    var directions = [];
    for (var dir in OFFSETS) {
        if(api.getOutcomeFromOffset({ x: position.x + OFFSETS[dir].x, y: position.y + OFFSETS[dir].y}) === outcome) {
            directions.push(dir);
        }
    }
    return directions;
}

function filterSurvivalMoves(validDirections, previous) {
    return validDirections.filter(function (direction) {
        return direction !== previous;
    })[0];
}

function getPreviousCell(direction) {
    switch(direction) {
        case DIRS.right: return DIRS.left; break;
        case DIRS.left: return DIRS.right; break;
        case DIRS.up: return DIRS.down; break;
        case DIRS.down: return DIRS.up; break;
    }
}

function executeJourney(moves, api) {
    moves.forEach(move => {
        api.move(move);
    });
}