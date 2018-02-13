function RouteFinder (getCellTypeFromOffset) {

  var OFFSETS = [
    {x:0, y:-1},
    {x:-1, y:0},
    {x:1, y:0},
    {x:0, y:1}
  ]
  var OFFSET_TO_DIR = {
    '0x-1': 'up',
    '-1x0': 'left',
    '1x0': 'right',
    '0x1': 'down',
  }
  var prevPos;
  var currentPos = {x:0, y:0};
  var win = false;

  var currentRoute = [currentPos];
  var potentialRoutesToTry = [];

  while (currentPos && potentialRoutesToTry.length === 0) {
    var possibilities = getPossiblesFromNode(currentPos, prevPos);
    prevPos = currentPos;

    if (possibilities.x && possibilities.y) {
      currentRoute.push(possibilities);
      win = true;
      currentPos = null;

    } else if (possibilities.length >= 1) {
      currentRoute.push(possibilities[0]);
      currentPos = possibilities[0];

      possibilities.forEach(function (possibility, index){
        if (index > 0){
          var otherRoute = Utils.copy(currentRoute);
          otherRoute.push(possibility);
          potentialRoutesToTry.push(otherRoute);
        }
      })

    } else {
      currentPos = null;
      if (potentialRoutesToTry.length) {
        currentRoute = potentialRoutesToTry.shift();
      }
    }
  }

  return win? currentRoute.map(function (pos, index){
    if (index > 0){
      var offset = {
        x:pos.x - currentRoute[index-1].x,
        y:pos.y - currentRoute[index-1].y
      }
      return OFFSET_TO_DIR[offset.x+'x'+offset.y];
    }
  }) : null

  function getPossiblesFromNode (pos, ignore) {
    var type, possibilities = [], posToTry;
    OFFSETS.forEach(function (offset) {
      posToTry = {
        x: pos.x + offset.x,
        y: pos.y + offset.y
      }
      if (!ignore || (ignore.x !== posToTry.x || ignore.y !== posToTry.y)) {
        type = getCellTypeFromOffset(posToTry);
        if (type === 'finish') {
          possibilities = posToTry;

        } else if (type !== 'empty' && possibilities.length >= 0 ) {
          possibilities.push(posToTry);
        }
      }
    });
    return possibilities
  }
}
