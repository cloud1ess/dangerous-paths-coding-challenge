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

  var previousMoves = new Map();
  var availableMoves = {
    up: {cell:{x:0, y:-1}, direction: DIRS.up},
    down: {cell: {x:0, y:1}, direction: DIRS.down}, 
    right: {cell: {x:1, y:0}, direction: DIRS.right}, 
    left: {cell:{x:-1, y:0}, direction: DIRS.left}
  };


  function runSolution (index, api) {
    switch (index) {
      case 0: 
        // simplePath(api);
        multiPath(api);
        break;
      case 1:
        multiPath(api);
        break;
      case 2:
        intervalMultiPath(api);
        break;
      default:
        multiPath(api);
        break;
    }
  }

  function stopSolution() {
  }

  function simplePath (api) {
    console.log(api.getOutcomeFromOffset({x:0, y:1})); //expect live
    api.move(DIRS.down);
    console.log(api.getOutcomeFromOffset({x:0, y:1})); //expect live
    api.move(DIRS.down);
    console.log(api.getOutcomeFromOffset({x:1, y:0})); //expect live
    api.move(DIRS.right);
    console.log(api.getOutcomeFromOffset({x:1, y:0})); //expect live
    api.move(DIRS.right);
    console.log(api.getOutcomeFromOffset({x:0, y:-1})); //expect live
    api.move(DIRS.up);
    console.log(api.getOutcomeFromOffset({x:1, y:0})); //expect live
    api.move(DIRS.right);
    console.log(api.getOutcomeFromOffset({x:1, y:0})); //expect live
    api.move(DIRS.right);
    console.log(api.getOutcomeFromOffset({x:0, y:1})); //expect live
    api.move(DIRS.down);
    console.log(api.getOutcomeFromOffset({x:0, y:1})); //expect live
    api.move(DIRS.down);
  }

  function multiPath (api) {
    var currentMove = {x:0, y:0};
    previousMoves.clear();
    console.log(api.getOutcomeFromOffset(currentMove));//expect live

    console.log(nextMove(api, currentMove));

    // if I can move to the next cell and I haven't previously been there, update current position.
    
    var determinePath = true;
    var path =[];
    previousMoves.set(computePreviousMoveKey(currentMove), currentMove);
    while (determinePath) {
      // at this point be more open minded. There could be multiple moves from a location, need to iterate these and look down each path then add vertices and connecting edges to a graph.
      let move = nextMove(api, currentMove).pop();

      if (move === undefined) {
        determinePath = false;
      } else {
        path.push(move);
        currentMove = move;
        previousMoves.set(computePreviousMoveKey(move), move);
      }
    }

    console.log(`path is: ${JSON.stringify(path)}`);

    path.forEach(function (step) {
      api.move(step.direction);
    })
    previousMoves.clear();
  }

  function intervalMultiPath (api) {

    setTimeout(function run() {
        multiPath(api);
        setTimeout(run, 100);
      }, 100);
  }

  function computePreviousMoveKey(cell) {
    return cell.x + '-' + cell.y;
  }

  function nextMoves(cell) {
    return [cellDownCoordinates(cell), cellUpCoordinates(cell), cellRightCoordinates(cell), cellLeftCoordinates(cell)];
  }

  function cellDownCoordinates(cell) {
    return {x: cell.x + availableMoves.down.cell.x, y: cell.y + availableMoves.down.cell.y, direction: DIRS.down};
  }

  function cellUpCoordinates(cell) {
    return {x: cell.x + availableMoves.up.cell.x, y: cell.y + availableMoves.up.cell.y, direction: DIRS.up};
  }

  function cellRightCoordinates(cell) {
    return {x: cell.x + availableMoves.right.cell.x, y: cell.y + availableMoves.right.cell.y, direction: DIRS.right};
  }

  function cellLeftCoordinates(cell) {
    return {x: cell.x + availableMoves.left.cell.x, y: cell.y + availableMoves.left.cell.y, direction: DIRS.left};
  }


  function nextMove(api, cell) {
    var moves = [];
    var nextMoveSet = nextMoves(cell);
    console.log(nextMoveSet);
    
    nextMoveSet.forEach(function (move) {
      if (!alreadyMoved(move)) {
        let checkCell = {
          x: move.x,
          y: move.y
        };

        if (cellIsPath(api, checkCell)) {
          moves.push(move);
        } else if (cellIsDisappearing(api, checkCell)) {
          moves.push(move);
        } else if (cellIsFinish(api, checkCell))
         moves.push(move);
        }
    });
    return moves;
  }

  function cellIsPath(api, cell) {
    return api.getCellTypeFromOffset(cell) === CELL_TYPES.path;
  }

  function cellIsDisappearing(api, cell) {
    return api.getCellTypeFromOffset(cell) === CELL_TYPES.path;
  }

  function cellIsFinish(api, cell) {
    return api.getCellTypeFromOffset(cell) === CELL_TYPES.finish;
  }

  function alreadyMoved(cell) {
    return previousMoves.get(computePreviousMoveKey(cell)) !== undefined;
  }

  function nextMoveFinishes(api, cell) {
    console.log(cell);
    return api.getOutcomeFromOffset(cell.x, cell.y) === OUTCOMES.finish;
  }


  // function nextPathDirection (api) {
  //   var directions = [];
  //   playerCells.forEach(function (cell){
  //     if (api.getCellTypeFromOffset(cell) === CELL_TYPES.path) {
  //       directions.push(cell);
  //     }
  //   });
  //   return directions;
  // } 

  // function validDirection (api) {
  //   var pathDirections = nextPathDirection(api);
  //   pathDirections.forEach(function (cell) {
  //     if (cell.x !== previousMove.x && cell.y !== previousMove.y) {
  //       return cell;
  //     }
  //   });
  // }

  // TODO: will be needed to check whether a path is valid to travel.
  // Correction: This can be thought of a shortest path problem. Graph algorithms ahoy! Check out some maze running algorithms too. 
  // Depth first search, breadth first seach, greedy algos etc.

  // Note api.getOutcomeFromOffset({x:1, y:0}) returns a string all of the time, while getCellTypeFromOffset returns null when there isn't a path or other object.

  // Maybe something like:
  // - Create a graph of cells that are not-null in cell type.
  // - Travel along the graph looking at adjacent vertices that lead to the finish point. Checking the previous vertex compared to the current one will give a direction of travel.
  // - Use these directions to move. Knowing that (1,0) is left or right, always check before moving otherwise wait and try again.

  // Note that to find out movements ahead of time without moving, simply add the x and y of the next cell to the current cell x/y until there are no longer any cells.
  // Discount any cells that have been visited already.

  // var cell = {
  //   point: {
  //     x: 0,
  //     y: 0
  //   },
  //   type: '',
  //   outcome: ''
  // };


  // Can use Maps and Sets in JS


  // function Graph() {
  //   var vertices = [];

  //   function neighbours(vertex) {

  //   }

  //   function adjacent(beginVertex, endVertex) {

  //   }

  //   function addVertex(vertex) {
  //     vertices.push(vertex);
  //   }

  //   function removeVertex(vertex) {
  //     vertices.pop(vertex);
  //   }

  //   function addEdge(beginVertex, endVertex) {
  //     vertices[beginVertex].addNeighbour(endVertex);
  //   }

  //   function removeEdge(edge) {

  //   }

  //   function getVertex(vertex) {
  //     return vertices[vertex];
  //   }
  // }

  // function isPathTraversable () {}

  // function pathDirection() {}

  // function isUp () {}

  // function isDown () {}

  // function isRight () {}

  // function isLeft () {}

 // ------------ graph nicked from tinternet

  function Graph() {
    this.vertices = [];
    this.edges = [];
    this.numberOfEdges = 0;
  }
  
  Graph.prototype.addVertex = function(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = [];
  };
  Graph.prototype.removeVertex = function(vertex) {
    var index = this.vertices.indexOf(vertex);
    if(~index) {
      this.vertices.splice(index, 1);
    }
    while(this.edges[vertex].length) {
      var adjacentVertex = this.edges[vertex].pop();
      this.removeEdge(adjacentVertex, vertex);
    }
  };
  Graph.prototype.addEdge = function(vertex1, vertex2) {
    this.edges[vertex1].push(vertex2);
    this.edges[vertex2].push(vertex1);
    this.numberOfEdges++;
  };
  Graph.prototype.removeEdge = function(vertex1, vertex2) {
    var index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
    var index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;
    if(~index1) {
      this.edges[vertex1].splice(index1, 1);
      this.numberOfEdges--;
    }
    if(~index2) {
      this.edges[vertex2].splice(index2, 1);
    }
  };
  Graph.prototype.size = function() {
    return this.vertices.length;
  };
  Graph.prototype.relations = function() {
    return this.numberOfEdges;
  };
  Graph.prototype.traverseDFS = function(vertex, fn) {
    if(!~this.vertices.indexOf(vertex)) {
      return console.log('Vertex not found');
    }
    var visited = [];
    this._traverseDFS(vertex, visited, fn);
  };
  Graph.prototype._traverseDFS = function(vertex, visited, fn) {
    visited[vertex] = true;
    if(this.edges[vertex] !== undefined) {
      fn(vertex);
    }
    for(var i = 0; i < this.edges[vertex].length; i++) {
      if(!visited[this.edges[vertex][i]]) {
        this._traverseDFS(this.edges[vertex][i], visited, fn);
      }
    }
  };
  Graph.prototype.traverseBFS = function(vertex, fn) {
    if(!~this.vertices.indexOf(vertex)) {
      return console.log('Vertex not found');
    }
    var queue = [];
    queue.push(vertex);
    var visited = [];
    visited[vertex] = true;
  
    while(queue.length) {
      vertex = queue.shift();
      fn(vertex);
      for(var i = 0; i < this.edges[vertex].length; i++) {
        if(!visited[this.edges[vertex][i]]) {
          visited[this.edges[vertex][i]] = true;
          queue.push(this.edges[vertex][i]);
        }
      }
    }
  };
  Graph.prototype.pathFromTo = function(vertexSource, vertexDestination) {
    if(!~this.vertices.indexOf(vertexSource)) {
      return console.log('Vertex not found');
    }
    var queue = [];
    queue.push(vertexSource);
    var visited = [];
    visited[vertexSource] = true;
    var paths = [];
  
    while(queue.length) {
      var vertex = queue.shift();
      for(var i = 0; i < this.edges[vertex].length; i++) {
        if(!visited[this.edges[vertex][i]]) {
          visited[this.edges[vertex][i]] = true;
          queue.push(this.edges[vertex][i]);
          // save paths between vertices
          paths[this.edges[vertex][i]] = vertex;
        }
      }
    }
    if(!visited[vertexDestination]) {
      return undefined;
    }
  
    var path = [];
    for(var j = vertexDestination; j != vertexSource; j = paths[j]) {
      path.push(j);
    }
    path.push(j);
    return path.reverse().join('-');
  };
  Graph.prototype.print = function() {
    console.log(this.vertices.map(function(vertex) {
      return (vertex + ' -> ' + this.edges[vertex].join(', ')).trim();
    }, this).join(' | '));
  };


  // ------------
  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
