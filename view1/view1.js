'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
 
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.font = "30px Arial";
ctx.drawImage(document.getElementById("refresh"), 800, 600);
myCanvas.addEventListener("mousedown", doMouseDown, false);

var anim = 0;
var end = 0;
var randomove = 0;
var win = 0;
var u = 0;
var e = 0;
var score = 0;
var items = [[0,0,0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0,0,0],
	     [0,0,0,0,0,0,0,0,0]]; //0 = blank, 1 = orange, 2 = blue

  class Point {
        constructor(row, column, parent) {
            this.row = row;
            this.column = column;
            this.parent = parent;
        }
        getParent() {
            return this.parent;
        }
	getRow(){
	    return this.row;
	}
	getColumn(){
	    return this.column;
	}
        toString() {
            return "row = " + row + " column = " + column;
        }
  }

function init()
{
end = 0;
randomove = 0;
win = 0;
score = 0;
ctx.drawImage(document.getElementById("cleartext"), 800, 0);
//ctx.drawImage(document.getElementById("cleartext"), 877, 0);
ctx.fillText("Score: " + score,800,50);
for(var i = 0; i < 9; i++)
{
	for(var j = 0; j < 9; j++)
	{
		items[i][j] = 0;
	}
}
u = Math.round(Math.random()*10); //0 to 10
e = Math.round(Math.random()*10); //0 to 10
var done = 0;
ctx.font = "30px Arial";
ctx.fillText("Score: " + score,800,50);
if(e >= 9)
{
	e = 8;
}
if(u >= 9)
{
	u = 8;
}

if(u < 3)
{
	u = 3;
}
else if(u >= 3 && u <= 5)
{
	u = 4;
}
else if(u = 5)
{
	u = 5;
}

if(e < 3)
{
	e = 3;
}
else if(e >= 3 && e <= 5)
{
	if(u == 4)
	{
		var r = Math.round(Math.random()*1); //0 to 1
		if(r == 0)
		{
			e == 3;
		}
		else
		{
			e == 5;
		}
	}
	else
	{
		e = 4;
	}
}
else if(e > 5)
{
	e = 5;
}

items[u][e] = 2;

for(var q = 0; q < 9; q++)
{
	while(!done)
	{
	var x = Math.round(Math.random()*10); //0 to 10
	if(x >= 9)
	{
		x = 8;
	}
	var y = Math.round(Math.random()*10); //0 to 10
	if(y >= 9)
	{
		y = 8;
	}
	if(((items[x][y]) != 1) && ((items[x][y]) != 2))
	{
		items[x][y] = 1;
		done = 1;
	}
	}
	done = 0;
}
}

init();

function updateBoard()
{
for(var j = 0; j < 9; j++)
{
	for(var i = 0; i < 9; i++)
	{
		if(j%2 == 0)
		{
			if(items[j][i] == 1)
			{
				ctx.drawImage(document.getElementById("orangecircle"), 10+(i*80), 10+(j*80));
			}
			else if(items[j][i] == 2)
			{
				ctx.drawImage(document.getElementById("bluecircle"), 10+(i*80), 10+(j*80));
			}
			else
			{
				items[j][i] = 0;
				ctx.drawImage(document.getElementById("blankcircle"), 10+(i*80), 10+(j*80));
			}
		}
		else
		{
			if(items[j][i] == 1)
			{
				ctx.drawImage(document.getElementById("orangecircle"), 45+(i*80), 10+(j*80));
			}
			else if(items[j][i] == 2)
			{
				ctx.drawImage(document.getElementById("bluecircle"), 45+(i*80), 10+(j*80));
			}
			else
			{
				items[j][i] = 0;
				ctx.drawImage(document.getElementById("blankcircle"), 45+(i*80), 10+(j*80));
			}
		}
	}
}
}

updateBoard();

var oldrow = 0;
var oldcol = 0;
function animation()
{
	if(randomove == 0)
	{
		updateBoard();
		items[u][e] = 2;
	}
	else
	{
		items[u][e] = 0;
		updateBoard();
		items[u][e] = 2;
	}
	if(oldrow%2 == 0) //no offset
	{
		if(u == (oldrow-1) && e == oldcol) //top right
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(oldcol*80)+20, 10+(oldrow*80)-40);
		}
		if(u == (oldrow-1) && e == (oldcol-1)) //top left
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(oldcol*80)-20, 10+(oldrow*80)-40);
		}
		if(u == oldrow && e == (oldcol-1)) //left
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(oldcol*80)-40, 10+(oldrow*80));
		}
		if(u == oldrow && e == (oldcol+1)) //right
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(oldcol*80)+40, 10+(oldrow*80));
		}
		if(u == (oldrow+1) && e == oldcol) //bottom right
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(oldcol*80)+20, 10+(oldrow*80)+40);
		}
		if(u == (oldrow+1) && e == (oldcol-1)) //bottom left
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(oldcol*80)-20, 10+(oldrow*80)+40);
		}
	}
	else //offset
	{
		if(u == (oldrow-1) && e == (oldcol+1)) //top right
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 45+(oldcol*80)+20, 10+(oldrow*80)-40);
		}
		if(u == (oldrow-1) && e == oldcol) //top left
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 45+(oldcol*80)-20, 10+(oldrow*80)-40);
		}
		if(u == oldrow && e == (oldcol-1)) //left
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 45+(oldcol*80)-40, 10+(oldrow*80));
		}
		if(u == oldrow && e == (oldcol+1)) //right
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 45+(oldcol*80)+40, 10+(oldrow*80));
		}
		if(u == (oldrow+1) && e == (oldcol+1)) //bottom right
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 45+(oldcol*80)+20, 10+(oldrow*80)+40);
		}
		if(u == (oldrow+1) && e == oldcol) //bottom left
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 45+(oldcol*80)-20, 10+(oldrow*80)+40);
		}
	}
}

function UpdateScore()
{
    	ctx.fillText("Score: " + score,800,50);
}

function ClearScreen()
{
	ctx.clearRect(0,0,1000,1000);
	updateBoard();
	ctx.drawImage(document.getElementById("refresh"), 800, 600);
}

var path = []; // (row, col), (row, col), etc.
function bluedotmove()
{
	items[u][e] = 0;
	oldrow = u;
	oldcol = e;
	u = path.shift();
	e = path.shift();
	var myVar1 = setTimeout(animation, 100);
	var myVar2 = setTimeout(ClearScreen, 200);
	var myVar3 = setTimeout(UpdateScore, 200);
	//updateBoard();
}

var queue = [];
function MazeSolver(row, column) {
	queue.push(new Point(row,column,null));
	while(queue.length != 0) //true
	{
		var p = queue.shift();
		
        	if((p.column == 0 || p.column == 8) || (p.row == 0 || p.row == 8)) 
		{
	 	   return p;
       		}

		if(p.row%2 == 0) //no offset
		{
			if(items[p.row][p.column+1] == 0)
			{
				items[p.row][p.column+1] = 3;
				var nextP = new Point(p.row,p.column+1, p);
				queue.push(nextP);
			}
			if(items[p.row-1][p.column] == 0)
			{
				items[p.row-1][p.column] = 3;
				var nextP = new Point(p.row-1,p.column, p);
				queue.push(nextP);
			}
			if(items[p.row-1][p.column-1] == 0)
			{
				items[p.row-1][p.column-1] = 3;
				var nextP = new Point(p.row-1,p.column-1, p);
				queue.push(nextP);
			}
			if(items[p.row][p.column-1] == 0)
			{
				items[p.row][p.column-1] = 3;
				var nextP = new Point(p.row,p.column-1, p);
				queue.push(nextP);
			}
			if(items[p.row+1][p.column-1] == 0)
			{
				items[p.row+1][p.column-1] = 3;
				var nextP = new Point(p.row+1,p.column-1, p);
				queue.push(nextP);
			}
			if(items[p.row+1][p.column] == 0)
			{
				items[p.row+1][p.column] = 3;
				var nextP = new Point(p.row+1,p.column, p);
				queue.push(nextP);
			}
	    	}
	    	else	//offset
		{
			if(items[p.row][p.column+1] == 0)
			{
				items[p.row][p.column+1] = 3;
				var nextP = new Point(p.row,p.column+1, p);
				queue.push(nextP);
			}
			if(items[p.row-1][p.column+1] == 0)
			{
				items[p.row-1][p.column+1] = 3;
				var nextP = new Point(p.row-1,p.column+1, p);
				queue.push(nextP);
			}
			if(items[p.row-1][p.column] == 0)
			{
				items[p.row-1][p.column] = 3;
				var nextP = new Point(p.row-1,p.column, p);
				queue.push(nextP);
			}
			if(items[p.row][p.column-1] == 0)
			{
				items[p.row][p.column-1] = 3;
				var nextP = new Point(p.row,p.column-1, p);
				queue.push(nextP);
			}
			if(items[p.row+1][p.column] == 0)
			{
				items[p.row+1][p.column] = 3;
				var nextP = new Point(p.row+1,p.column, p);
				queue.push(nextP);
			}
			if(items[p.row+1][p.column+1] == 0)
			{
				items[p.row+1][p.column+1] = 3;
				var nextP = new Point(p.row+1,p.column+1, p);
				queue.push(nextP);
			}
           	}
	}
	return null;
}

var availableMoves = [];
function checkMoves()
{
            if(u%2 == 0) //no offset
	    {
		if(items[u-1][e] == 0)
		{
			availableMoves.push("topright");
		}
		if(items[u][(e+1)] == 0)
		{
			availableMoves.push("right");
		}
		if(items[u-1][(e-1)] == 0)
		{
			availableMoves.push("topleft");
		}
		if(items[(u+1)][e] == 0)
		{
			availableMoves.push("botright");
		}
		if(items[u][(e-1)] == 0)
		{
			availableMoves.push("left");
		}
		if(items[(u+1)][e-1] == 0)
		{
			availableMoves.push("botleft");
		}
	    }
	    else
	    {
		if(items[(u-1)][e+1] == 0)
		{
			availableMoves.push("topright");
		}
		if(items[u][e+1] == 0)
		{
			availableMoves.push("right");
		}
		if(items[(u-1)][e] == 0)
		{
			availableMoves.push("topleft");
		}
		if(items[(u+1)][e+1] == 0)
		{
			availableMoves.push("botright");
		}
		if(items[u][(e-1)] == 0)
		{
			availableMoves.push("left");
		}
		if(items[(u+1)][e] == 0)
		{
			availableMoves.push("botleft");
		}
            }
}

function RandomMove()
{
	checkMoves();
	oldrow = u;
	oldcol = e;
	if(availableMoves.length > 0)
	{
		var direction = Math.round(Math.random()*(availableMoves.length-1));
		direction = availableMoves[direction];
		availableMoves = availableMoves.slice(0,0);
	}
	else
	{
		win = 1;
		ctx.fillText("You win!",800,150);
		return;
	}
            if(u%2 == 0) //no offset
	    {
		if(direction == "topright")
		{
			items[u][e] = 0;
			items[u-1][e] = 2;
			u = u-1;
			e = e;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "right")
		{
			items[u][e] = 0;
			items[u][e+1] = 2;
			u = u;
			e = e+1;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "topleft")
		{
			items[u][e] = 0;
			items[u-1][e-1] = 2;
			u = u-1;
			e = e-1;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "botright")
		{
			items[u][e] = 0;
			items[u+1][e] = 2;
			u = u+1;
			e = e;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "left")
		{
			items[u][e] = 0;
			items[u][e-1] = 2;
			u = u;
			e = e-1;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "botleft")
		{
			items[u][e] = 0;
			items[u+1][e-1] = 2;
			u = u+1;
			e = e-1;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
	    }
	    else
	    {
		if(direction == "topright")
		{
			items[u][e] = 0;
			items[u-1][e+1] = 2;
			u = u-1;
			e = e+1;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "right")
		{
			items[u][e] = 0;
			items[u][e+1] = 2;
			u = u;
			e = e+1;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "topleft")
		{
			items[u][e] = 0;
			items[u-1][e] = 2;
			u = u-1;
			e = e;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "botright")
		{
			items[u][e] = 0;
			items[u+1][e+1] = 2;
			u = u+1;
			e = e+1;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "left")
		{
			items[u][e] = 0;
			items[u][e-1] = 2;
			u = u;
			e = e-1;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
		if(direction == "botleft")
		{
			items[u][e] = 0;
			items[u+1][e] = 2;
			u = u+1;
			e = e;
			var myVar1 = setTimeout(animation, 100);
			var myVar2 = setTimeout(ClearScreen, 200);
			var myVar3 = setTimeout(UpdateScore, 200);
			return;
		}
            }
}


function fadeOut(col, row) {
	ctx.drawImage(document.getElementById("bluecircleanimated2"), col, row);
	setTimeout(function() {
			ClearScreen();
			UpdateScore();
			ctx.fillText("You lose!",800,150);
			anim = 0;
	}, 500)
}

function EndAnimation()
{
	updateBoard();
	if(u == 8)
	{
		ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(e*80), 10+(u*80)+40);
		setTimeout(function() {
			ClearScreen();
			UpdateScore();
    			fadeOut(10+(e*80), 10+(u*80)+80);
		}, 500)
		return;
	}
	if(u == 0)
	{
		ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(e*80), 10+(u*80)-40);
		setTimeout(function() {
			ClearScreen();
			UpdateScore();
    			fadeOut(10+(e*80), 10+(u*80)-80);
		}, 500)
		return;
	}
	if(u%2 == 0) //no offset
	{
		if(e == 8)
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(e*80)+40, 10+(u*80));	
			setTimeout(function() {
				ClearScreen();
				UpdateScore();
    				fadeOut(10+(e*80)+80, 10+(u*80));
			}, 500)
		}
		else if (e == 0)
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 10+(e*80)-40, 10+(u*80));
			setTimeout(function() {
				ClearScreen();
				UpdateScore();
    				fadeOut(10+(e*80)-80, 10+(u*80));
			}, 500)
		}
	}
	else
	{
		if(e == 8)
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 45+(e*80)+40, 10+(u*80));	
			setTimeout(function() {
				ClearScreen();
				UpdateScore();
    				fadeOut(45+(e*80)+80, 10+(u*80));
			}, 500)
		}
		else if (e == 0)
		{
			ctx.drawImage(document.getElementById("bluecircleanimated"), 45+(e*80)-40, 10+(u*80));
			setTimeout(function() {
				ClearScreen();
				UpdateScore();
    				fadeOut(45+(e*80)-80, 10+(u*80));
			}, 500)
		}
	}
}

function doMouseDown(event) {
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;
    //alert("x=" + canvas_x + " y=" + canvas_y);
    for(var j = 0; j < 9; j++)
    {
	for(var i = 0; i < 9; i++)
	{
		if(j%2 == 0)
		{
    			if((canvas_x >= 10+(80*i) && canvas_x <= 10+(80*(i+1))) && (canvas_y >= 10+(80*j) && canvas_y <= 10+(80*(j+1))))
    			{
				if(items[j][i] != 1 && items[j][i] != 2)
				{
					if((u == 8 || u ==0) || (e == 8 || e == 0))
					{
						if(items[u][e] == 2)
						{
							items[j][i] = 1;
							ClearScreen();
							score++;
							UpdateScore();
						}
						items[u][e] = 0;
						if(!end)
						{
							end = 1;
							anim = 1;
							var myVar1 = setTimeout(EndAnimation, 500);
						}
					}
					else
					{
						if(win == 0)
						{
						ClearScreen();
						score++;
						UpdateScore();
						items[j][i] = 1;
						queue = queue.slice(0,0);
						path = path.slice(0,0);
						var p = MazeSolver(u,e);
						
						if(p == null)
						{
							randomove = 1;
							updateBoard();
							RandomMove();
						}
						else
						{
							while(p.getParent() != null) {
								path.push(p.getColumn());
           							path.push(p.getRow());
          							p = p.getParent();
        						}
						path = path.reverse();
						bluedotmove();
						}
						}
					}
				}
			}
    		}
		else
		{
    			if((canvas_x >= 45+(80*i) && canvas_x <= 45+(80*(i+1))) && (canvas_y >= 10+(80*j) && canvas_y <= 10+(80*(j+1))))
    			{
				if(items[j][i] != 1 && items[j][i] != 2)
				{
					if((u == 8 || u ==0) || (e == 8 || e == 0))
					{
						if(items[u][e] == 2)
						{
							items[j][i] = 1;
							ClearScreen();
							score++;
							UpdateScore();
						}
						items[u][e] = 0;	
						if(!end)
						{
							end = 1;
							anim = 1;
							var myVar1 = setTimeout(EndAnimation, 500);
						}
					}
					else
					{
						if(win == 0)
						{
							ClearScreen();
							score++;
							UpdateScore();
							items[j][i] = 1;
							queue = queue.slice(0,0);
							path = path.slice(0,0);
							var p = MazeSolver(u,e);

							if(p == null)
							{
								randomove = 1;
								updateBoard();
								RandomMove();
							}
							else
							{
							while(p.getParent() != null) {
								path.push(p.getColumn());
           							path.push(p.getRow());
          							p = p.getParent();
        						}
							path = path.reverse();
							bluedotmove();
							}
						}
					}
				}
			}
    		}
	}
	}
	if((canvas_x >= 800 && canvas_x <= 900) && (canvas_y >= 600 && canvas_y <= 700))
	{
		if(anim == 0)
		{
			init();
			updateBoard();
		}
	}
}

