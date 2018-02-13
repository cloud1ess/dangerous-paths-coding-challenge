function PerformRoute (route, movePlayer) {
  route.forEach(function (dir) {
    if (dir) {
      movePlayer(dir);      
    }
  });
}
