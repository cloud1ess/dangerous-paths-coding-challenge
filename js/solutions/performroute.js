function PerformRoute (route, movePlayer) {
  var index = 0;

  route.forEach(function (dir) {
    if (dir) {
      movePlayer(dir);
    }
  });

  // var ticker = setInterval(function () {
  //   var dir = route[index];
  //   index++;
  //   if (dir) {
  //     movePlayer(dir);
  //   }
  //   if (index >= route.length) {
  //     clearInterval(ticker);
  //   }
  // }, 5)
}
