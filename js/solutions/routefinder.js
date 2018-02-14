function RouteFinder (getCellTypeFromOffset) {

  var OFFSETS = [
    {x:0, y:-1},
    {x:1, y:0},
    {x:-1, y:0},
    {x:0, y:1}
  ]
  var OFFSET_TO_DIR = {
    '0x-1': 'up',
    '1x0': 'right',
    '-1x0': 'left',
    '0x1': 'down'
  }
  var complete = false;
  var currentPos = {x:0, y:0};
  var currentRoute = [currentPos];
  var potentialRoutesToTry = [];

  while (!complete) {
    var possibilities = getNextPossibleMoves(currentRoute);

    if ((possibilities.x || possibilities.x === 0) && (possibilities.y || possibilities.y === 0)) {
      currentRoute.push(possibilities);
      complete = true;
      currentPos = null;

    } else if (possibilities.length >= 1) {

      possibilities.forEach(function (possibility, index){
        if (index > 0){
          var otherRoute = Utils.copy(currentRoute);
          otherRoute.push(possibility);
          potentialRoutesToTry.push(otherRoute);
        }
      })
      currentRoute.push(possibilities[0]);
      currentPos = possibilities[0];

    } else {
      currentPos = null;
      if (potentialRoutesToTry.length) {
        currentRoute = potentialRoutesToTry.shift();
        currentPos = currentRoute[currentRoute.length-1]
      } else {
        complete = true;
      }
    }
  }

  return complete? currentRoute.map(function (pos, index){
    if (index > 0){
      var offset = {
        x:pos.x - currentRoute[index-1].x,
        y:pos.y - currentRoute[index-1].y
      }
      return OFFSET_TO_DIR[offset.x+'x'+offset.y];
    }
  }) : null

  function getNextPossibleMoves (route) {
    var type,
        possibilities = [];

    OFFSETS.forEach(function (offset) {
      posToTry = {
        x: route[route.length-1].x + offset.x,
        y: route[route.length-1].y + offset.y
      }
      type = getCellTypeFromOffset(posToTry);
      if (type === 'finish') {
        possibilities = posToTry;

      } else if (type !== 'empty' && possibilities.length >= 0 && !hasBeenHereBefore(posToTry, route)) {
        possibilities.push(posToTry);
      }
    });
    return possibilities
  }

  function hasBeenHereBefore (pos, route) {
    for (var i=0; i<route.length; i++) {
      if (pos.x === route[i].x && pos.y === route[i].y) {
        return true
      }
    }
    return false;
  }
}
