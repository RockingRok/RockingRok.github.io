app.controller('GameBoardController', ['$scope', function($scope) { 
  var blue_dot_coords = [2];
  $scope.game_board = [
	  ['0', ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']],
	  ['1', ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']],
	  ['2', ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']],
	  ['3', ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']],
	  ['4', ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']],
	  ['5', ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']],
	  ['6', ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']],
	  ['7', ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']],
	  ['8', ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']]
  ];

  var game_done = false;

  $scope.steps = 0;

  $scope.animation = false;

  $scope.console = '';
  
  $scope.circleClicked = function(i, j)
  {
	  if($scope.game_board[i][1][j] != 'black') return 0;

	  if($scope.console.length == 0)
	  {
		  $scope.steps++;
		  $scope.game_board[i][1][j] = 'brown';
	  }

	  if((blue_dot_coords[0] == 0 || blue_dot_coords[0] == 8) || (blue_dot_coords[1] == 0 || blue_dot_coords[1] == 8))
	  {
		  $scope.game_board[blue_dot_coords[0]][1][blue_dot_coords[1]] = 'black';
		  animation(blue_dot_coords[0], blue_dot_coords[1], true);
		  $scope.console = 'You lost!';
	  }
	  else if (getAvailableMoves(convertToNumMatrix()).length == 0)
	  {
		  $scope.console = 'You won!';
	  }
	  else
	  {
		  var end_point = MazeSolver(convertToNumMatrix());
		  if(end_point != null)
		  {
			  while(end_point.getParent().getParent() != null) {
				  end_point = end_point.getParent();
				  }
			  blueDotMove(end_point.getRow(), end_point.getColumn());
			  }
		  else
		  {
			  RandomMove(convertToNumMatrix());
		  }
	  }
  }


  function animation(end_row, end_col, game_end)
  {
	  var blue_dot_animation = document.getElementById('animation_circle');
	  var end_dot_element = document.getElementById('circle_' + end_row + '' + end_col);
	  if(game_end)
	  {
		  if(end_row == 0 || end_row == 8)
		  {
			  blue_dot_animation.style.top = end_row == 0 ? end_dot_element.offsetTop - 100 + 'px' : end_dot_element.offsetTop + 100 + 'px';
			  blue_dot_animation.style.opacity = 0;
		  }
		  else
		  {
			  blue_dot_animation.style.left = end_col == 0 ? end_dot_element.offsetLeft - 100 + 'px' : end_dot_element.offsetLeft + 100 + 'px';
			  blue_dot_animation.style.opacity = 0;
		  }
	  }
	  else
	  {
		  blue_dot_animation.style.left = end_dot_element.offsetLeft + 'px';
		  blue_dot_animation.style.top = end_dot_element.offsetTop + 'px';
	  }
  }

  var Point = (function() {
	  function Point(row, column, parent) {
	      this.row = row;
	      this.column = column;
	      this.parent = parent;
	  }

	  Point.prototype.getParent = function() {
	      return this.parent;
	  };

	  Point.prototype.getRow = function() {
	      return this.row;
	  };

	  Point.prototype.getColumn = function() {
	      return this.column;
	  };
	  return Point;
	})();

  var Coordinate = (function() {
	  function Coordinate(row, column) {
	      this.row = row;
	      this.column = column;
	  }
	  Coordinate.prototype.getRow = function() {
	      return this.row;
	  };

	  Coordinate.prototype.getColumn = function() {
	      return this.column;
	  };
	  return Coordinate;
	})();
  
  function convertToNumMatrix()
  {
	  var matrix = [[],[],[],[],[],[],[],[],[]];
	  for(var i = 0; i < 9; i++)
	  {
		  for(var j = 0; j < 9; j++)
		  {
			  var board_value = $scope.game_board[i][1][j];
			  if(board_value == 'black')
			  {
				  matrix[i][j] = 0;
			  }
			  else if(board_value = 'brown')
			  {
				  matrix[i][j] = 1;
			  }
			  else
			  {
				  matrix[i][j] = 2;
			  }
		  }
	  }
	  return matrix;
  }
  
  function MazeSolver(matrix) {
	var queue = [];
  	queue.push(new Point(blue_dot_coords[0], blue_dot_coords[1], null));
  	while(queue.length != 0)
  	{
  		var p = queue.shift();

        if((p.column == 0 || p.column == 8) || (p.row == 0 || p.row == 8)) 
  		{
  	 	   return p;
        }

  		if(p.row % 2 == 0)
  		{
  			if(matrix[p.row][p.column+1] == 0)
  			{
  				matrix[p.row][p.column+1] = 3;
  				queue.push(new Point(p.row, p.column+1, p));
  			}
  			if(matrix[p.row-1][p.column] == 0)
  			{
  				matrix[p.row-1][p.column] = 3;
  				queue.push(new Point(p.row-1, p.column, p));
  			}
  			if(matrix[p.row-1][p.column-1] == 0)
  			{
  				matrix[p.row-1][p.column-1] = 3;
  				queue.push(new Point(p.row-1, p.column-1, p));
  			}
  			if(matrix[p.row][p.column-1] == 0)
  			{
  				matrix[p.row][p.column-1] = 3;
  				queue.push(new Point(p.row, p.column-1, p));
  			}
  			if(matrix[p.row+1][p.column-1] == 0)
  			{
  				matrix[p.row+1][p.column-1] = 3;
  				queue.push(new Point(p.row+1, p.column-1, p));
  			}
  			if(matrix[p.row+1][p.column] == 0)
  			{
  				matrix[p.row+1][p.column] = 3;
  				queue.push(new Point(p.row+1, p.column, p));
  			}
  	    }
  	    else
  		{
  			if(matrix[p.row][p.column+1] == 0)
  			{
  				matrix[p.row][p.column+1] = 3;
  				queue.push(new Point(p.row, p.column+1, p));
  			}
  			if(matrix[p.row-1][p.column+1] == 0)
  			{
  				matrix[p.row-1][p.column+1] = 3;
  				queue.push(new Point(p.row-1, p.column+1, p));
  			}
  			if(matrix[p.row-1][p.column] == 0)
  			{
  				matrix[p.row-1][p.column] = 3;
  				queue.push(new Point(p.row-1, p.column, p));
  			}
  			if(matrix[p.row][p.column-1] == 0)
  			{
  				matrix[p.row][p.column-1] = 3;
  				queue.push(new Point(p.row, p.column-1, p));
  			}
  			if(matrix[p.row+1][p.column] == 0)
  			{
  				matrix[p.row+1][p.column] = 3;
  				queue.push(new Point(p.row+1, p.column, p));
  			}
  			if(matrix[p.row+1][p.column+1] == 0)
  			{
  				matrix[p.row+1][p.column+1] = 3;
  				queue.push(new Point(p.row+1, p.column+1, p));
  			}
     	}
  	}
  	return null;
  }

  function RandomMove(matrix)
  {
	  var availableMoves = getAvailableMoves(matrix);
	  var random_choice = Math.round(Math.random()*(availableMoves.length-1));
	  blueDotMove(availableMoves[random_choice].row, availableMoves[random_choice].column)
  }

  function getAvailableMoves(matrix)
  {
	var availableMoves = [];
	if(blue_dot_coords[0] % 2 == 0)
	{
		if(matrix[blue_dot_coords[0]-1][blue_dot_coords[1]] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0] - 1, blue_dot_coords[1]));
		}
		if(matrix[blue_dot_coords[0]][blue_dot_coords[1]+1] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0], blue_dot_coords[1] + 1));
		}
		if(matrix[blue_dot_coords[0]-1][(blue_dot_coords[1]-1)] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0] - 1, blue_dot_coords[1] - 1));
		}
		if(matrix[blue_dot_coords[0]+1][blue_dot_coords[1]] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0] + 1, blue_dot_coords[1]));
		}
		if(matrix[blue_dot_coords[0]][(blue_dot_coords[1]-1)] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0], blue_dot_coords[1] - 1));
		}
		if(matrix[blue_dot_coords[0]+1][blue_dot_coords[1]-1] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0] + 1, blue_dot_coords[1] - 1));
		}
	    }
	    else
	    {
		if(matrix[blue_dot_coords[0]-1][blue_dot_coords[1]+1] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0] - 1, blue_dot_coords[1] + 1));
		}
		if(matrix[blue_dot_coords[0]][blue_dot_coords[1]+1] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0], blue_dot_coords[1] + 1));
		}
		if(matrix[blue_dot_coords[0]-1][blue_dot_coords[1]] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0] - 1, blue_dot_coords[1]));
		}
		if(matrix[blue_dot_coords[0]+1][blue_dot_coords[1]+1] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0] + 1, blue_dot_coords[1] + 1));
		}
		if(matrix[blue_dot_coords[0]][blue_dot_coords[1]-1] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0], blue_dot_coords[1] - 1));
		}
		if(matrix[blue_dot_coords[0]+1][blue_dot_coords[1]] == 0)
		{
			availableMoves.push(new Coordinate(blue_dot_coords[0] + 1, blue_dot_coords[1]));
		}
	}
	return availableMoves;
  }

  function blueDotMove(chosen_row, chosen_col)
  {
	$scope.game_board[blue_dot_coords[0]][1][blue_dot_coords[1]] = 'black';
	animation(chosen_row, chosen_col, false);
	setTimeout(function() { 
		blue_dot_coords[0] = chosen_row;
		blue_dot_coords[1] = chosen_col;
		$scope.game_board[blue_dot_coords[0]][1][blue_dot_coords[1]] = 'blue';
		$scope.$apply();
	}, 200);
  }
  
  function init()
  {
	  var rows = [10];
	  for(var i = 0; i < 10; i++)
	  {
		  rows[i] = Math.round(Math.random()*8);
	  }
	  
	  var cols = [10];
	  for(var i = 0; i < 10; i++)
	  {
		  cols[i] = Math.round(Math.random()*8);
	  }
	  
	  for(var i = 0; i < 10; i++)
	  {
		  $scope.game_board[rows[i]][1][cols[i]] = 'brown';
	  }
	  
	  blue_dot_coords[0] = Math.round(Math.random()*8);
	  blue_dot_coords[1] = Math.round(Math.random()*8);
	  if(blue_dot_coords[0] < 3) blue_dot_coords[0] = 3;
	  if(blue_dot_coords[0] > 5) blue_dot_coords[0] = 5;
	  if(blue_dot_coords[1] < 3) blue_dot_coords[1] = 3;
	  if(blue_dot_coords[1] > 5) blue_dot_coords[1] = 5;
	  $scope.game_board[blue_dot_coords[0]][1][blue_dot_coords[1]] = 'blue';

	  var checkExist = setInterval(function() {
   	  	if (document.getElementById('animation_circle') != null && document.getElementById('circle_' + blue_dot_coords[0] + '' + blue_dot_coords[1]) != null) {
			animation_init();
			clearInterval(checkExist);
	  	}
	  }, 250);
  }
  
  function animation_init()
  {
	  var blue_dot_animation = document.getElementById('animation_circle');
	  var blue_dot_element = document.getElementById('circle_' + blue_dot_coords[0] + '' + blue_dot_coords[1]);
	  blue_dot_animation.style.left = blue_dot_element.offsetLeft + 'px';
	  blue_dot_animation.style.top = blue_dot_element.offsetTop + 'px';
	  blue_dot_animation.style.height = blue_dot_element.offsetHeight + 'px';
	  blue_dot_animation.style.width = blue_dot_element.offsetWidth + 'px';
	  $scope.animation = true;
	  $scope.$apply();
  }
 
  function resizeElements()
  {
	  var blue_dot_animation = document.getElementById('animation_circle');
	  var blue_dot_element = document.getElementById('circle_' + blue_dot_coords[0] + '' + blue_dot_coords[1]);
	  if(blue_dot_animation != null && blue_dot_element != null)
	  {
		blue_dot_animation.style.transition = '0s';
	  	blue_dot_animation.style.left = blue_dot_element.offsetLeft + 'px';
	  	blue_dot_animation.style.top = blue_dot_element.offsetTop + 'px';
	  	blue_dot_animation.style.height = blue_dot_element.offsetHeight + 'px';
	  	blue_dot_animation.style.width = blue_dot_element.offsetWidth + 'px';
		blue_dot_animation.style.transition = '.2s';
	  }
  }

  init();
  window.addEventListener('resize', function(event){ resizeElements(); });
}]);