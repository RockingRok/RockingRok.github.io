'use strict';

angular.module('myApp.BlueDot', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/BlueDot', {
 
    controller: 'BlueDotCtrl'
  });
}])

.controller('BlueDotCtrl', [function() {

}]);

class Point {
    constructor(row, column, parent) {
        this.row = row;
        this.column = column;
        this.parent = parent;
    }
    getParent() {
        return this.parent;
    }
    getRow() {
        return this.row;
    }
    getColumn() {
        return this.column;
    }
    toString() {
        return "row = " + row + " column = " + column;
    }
}

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.font = "30px Arial";
var animation_flag = 0;
var end_animation_flag = 0;
var random_movement_flag = 0;
var victory_flag = 0;
var blue_dot = new Point(0, 0, (new Point(0, 0, null)));
var score = 0;
var game_state = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0]]; //0 = blank, 1 = orange, 2 = blue

function reset_game_state() {
    animation_flag = 0;
    end_animation_flag = 0;
    random_movement_flag = 0;
    victory_flag = 0;
    blue_dot = new Point(0, 0, (new Point(0, 0, null)));
    score = 0;
    ctx.drawImage(document.getElementById("refresh"), 800, 600);
    ctx.drawImage(document.getElementById("cleartext"), 800, 0);
    ctx.fillText("Score: " + score, 800, 50);
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            game_state[i][j] = 0;
        }
    }
    blue_dot.row = Math.round(Math.random() * 10); //0 to 10
    blue_dot.column = Math.round(Math.random() * 10); //0 to 10
    if (blue_dot.column >= 9) {
        blue_dot.column = 8;
    }
    if (blue_dot.row >= 9) {
        blue_dot.row = 8;
    }

    if (blue_dot.row < 3) {
        blue_dot.row = 3;
    }
    else if (blue_dot.row >= 3 && blue_dot.row <= 5) {
        blue_dot.row = 4;
    }
    else if (blue_dot.row = 5) {
        blue_dot.row = 5;
    }

    if (blue_dot.column < 3) {
        blue_dot.column = 3;
    }
    else if (blue_dot.column >= 3 && blue_dot.column <= 5) {
        if (blue_dot.row == 4) {
            var r = Math.round(Math.random() * 1); //0 to 1
            if (r == 0) {
                blue_dot.column == 3;
            }
            else {
                blue_dot.column == 5;
            }
        }
        else {
            blue_dot.column = 4;
        }
    }
    else if (blue_dot.column > 5) {
        blue_dot.column = 5;
    }

    game_state[blue_dot.row][blue_dot.column] = 2;

    var done = 0;
    for (var q = 0; q < 9; q++) {
        while (!done) {
            var x = Math.round(Math.random() * 10); //0 to 10
            if (x >= 9) {
                x = 8;
            }
            var y = Math.round(Math.random() * 10); //0 to 10
            if (y >= 9) {
                y = 8;
            }
            if (((game_state[x][y]) != 1) && ((game_state[x][y]) != 2)) {
                game_state[x][y] = 1;
                done = 1;
            }
        }
        done = 0;
    }
}


function display_game_state() {
    for (var j = 0; j < 9; j++) {
        for (var i = 0; i < 9; i++) {
            if (j % 2 == 0) {
                if (game_state[j][i] == 1) {
                    ctx.drawImage(document.getElementById("orangecircle"), 10 + (i * 80), 10 + (j * 80));
                }
                else if (game_state[j][i] == 2) {
                    ctx.drawImage(document.getElementById("bluecircle"), 10 + (i * 80), 10 + (j * 80));
                }
                else {
                    game_state[j][i] = 0;
                    ctx.drawImage(document.getElementById("blankcircle"), 10 + (i * 80), 10 + (j * 80));
                }
            }
            else {
                if (game_state[j][i] == 1) {
                    ctx.drawImage(document.getElementById("orangecircle"), 45 + (i * 80), 10 + (j * 80));
                }
                else if (game_state[j][i] == 2) {
                    ctx.drawImage(document.getElementById("bluecircle"), 45 + (i * 80), 10 + (j * 80));
                }
                else {
                    game_state[j][i] = 0;
                    ctx.drawImage(document.getElementById("blankcircle"), 45 + (i * 80), 10 + (j * 80));
                }
            }
        }
    }
}
window.onload = function () {
    reset_game_state();
    display_game_state();
    myCanvas.addEventListener("mousedown", doMouseDown, false);
}

function animation() {
    if (random_movement_flag == 0) {
        display_game_state();
        game_state[blue_dot.row][blue_dot.column] = 2;
    }
    else {
        game_state[blue_dot.row][blue_dot.column] = 0;
        display_game_state();
        game_state[blue_dot.row][blue_dot.column] = 2;
    }
    if ((blue_dot.parent).row % 2 == 0) //no offset
    {
        if (blue_dot.row == ((blue_dot.parent).row - 1) && blue_dot.column == (blue_dot.parent).column) //top right
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + ((blue_dot.parent).column * 80) + 20, 10 + ((blue_dot.parent).row * 80) - 40);
        }
        if (blue_dot.row == ((blue_dot.parent).row - 1) && blue_dot.column == ((blue_dot.parent).column - 1)) //top left
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + ((blue_dot.parent).column * 80) - 20, 10 + ((blue_dot.parent).row * 80) - 40);
        }
        if (blue_dot.row == (blue_dot.parent).row && blue_dot.column == ((blue_dot.parent).column - 1)) //left
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + ((blue_dot.parent).column * 80) - 40, 10 + ((blue_dot.parent).row * 80));
        }
        if (blue_dot.row == (blue_dot.parent).row && blue_dot.column == ((blue_dot.parent).column + 1)) //right
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + ((blue_dot.parent).column * 80) + 40, 10 + ((blue_dot.parent).row * 80));
        }
        if (blue_dot.row == ((blue_dot.parent).row + 1) && blue_dot.column == (blue_dot.parent).column) //bottom right
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + ((blue_dot.parent).column * 80) + 20, 10 + ((blue_dot.parent).row * 80) + 40);
        }
        if (blue_dot.row == ((blue_dot.parent).row + 1) && blue_dot.column == ((blue_dot.parent).column - 1)) //bottom left
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + ((blue_dot.parent).column * 80) - 20, 10 + ((blue_dot.parent).row * 80) + 40);
        }
    }
    else //offset
    {
        if (blue_dot.row == ((blue_dot.parent).row - 1) && blue_dot.column == ((blue_dot.parent).column + 1)) //top right
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + ((blue_dot.parent).column * 80) + 20, 10 + ((blue_dot.parent).row * 80) - 40);
        }
        if (blue_dot.row == ((blue_dot.parent).row - 1) && blue_dot.column == (blue_dot.parent).column) //top left
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + ((blue_dot.parent).column * 80) - 20, 10 + ((blue_dot.parent).row * 80) - 40);
        }
        if (blue_dot.row == (blue_dot.parent).row && blue_dot.column == ((blue_dot.parent).column - 1)) //left
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + ((blue_dot.parent).column * 80) - 40, 10 + ((blue_dot.parent).row * 80));
        }
        if (blue_dot.row == (blue_dot.parent).row && blue_dot.column == ((blue_dot.parent).column + 1)) //right
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + ((blue_dot.parent).column * 80) + 40, 10 + ((blue_dot.parent).row * 80));
        }
        if (blue_dot.row == ((blue_dot.parent).row + 1) && blue_dot.column == ((blue_dot.parent).column + 1)) //bottom right
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + ((blue_dot.parent).column * 80) + 20, 10 + ((blue_dot.parent).row * 80) + 40);
        }
        if (blue_dot.row == ((blue_dot.parent).row + 1) && blue_dot.column == (blue_dot.parent).column) //bottom left
        {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + ((blue_dot.parent).column * 80) - 20, 10 + ((blue_dot.parent).row * 80) + 40);
        }
    }
}

function UpdateScore() {
    ctx.fillText("Score: " + score, 800, 50);
}

function ClearScreen() {
    ctx.clearRect(0, 0, 1000, 1000);
    display_game_state();
    ctx.drawImage(document.getElementById("refresh"), 800, 600);
}

var path = []; // (row, col), (row, col), etc.
function bluedotmove() {
    game_state[blue_dot.row][blue_dot.column] = 0;
    (blue_dot.parent).row = blue_dot.row;
    (blue_dot.parent).column = blue_dot.column;
    blue_dot.row = path.shift();
    blue_dot.column = path.shift();
    var myVar1 = setTimeout(animation, 100);
    var myVar2 = setTimeout(ClearScreen, 200);
    var myVar3 = setTimeout(UpdateScore, 200);
}

var queue = [];
function MazeSolver(row, column) {
    queue.push(new Point(row, column, null));
    while (queue.length != 0) //true
    {
        var p = queue.shift();

        if ((p.column == 0 || p.column == 8) || (p.row == 0 || p.row == 8)) {
            return p;
        }

        if (p.row % 2 == 0) //no offset
        {
            if (game_state[p.row][p.column + 1] == 0) {
                game_state[p.row][p.column + 1] = 3;
                var nextP = new Point(p.row, p.column + 1, p);
                queue.push(nextP);
            }
            if (game_state[p.row - 1][p.column] == 0) {
                game_state[p.row - 1][p.column] = 3;
                var nextP = new Point(p.row - 1, p.column, p);
                queue.push(nextP);
            }
            if (game_state[p.row - 1][p.column - 1] == 0) {
                game_state[p.row - 1][p.column - 1] = 3;
                var nextP = new Point(p.row - 1, p.column - 1, p);
                queue.push(nextP);
            }
            if (game_state[p.row][p.column - 1] == 0) {
                game_state[p.row][p.column - 1] = 3;
                var nextP = new Point(p.row, p.column - 1, p);
                queue.push(nextP);
            }
            if (game_state[p.row + 1][p.column - 1] == 0) {
                game_state[p.row + 1][p.column - 1] = 3;
                var nextP = new Point(p.row + 1, p.column - 1, p);
                queue.push(nextP);
            }
            if (game_state[p.row + 1][p.column] == 0) {
                game_state[p.row + 1][p.column] = 3;
                var nextP = new Point(p.row + 1, p.column, p);
                queue.push(nextP);
            }
        }
        else	//offset
        {
            if (game_state[p.row][p.column + 1] == 0) {
                game_state[p.row][p.column + 1] = 3;
                var nextP = new Point(p.row, p.column + 1, p);
                queue.push(nextP);
            }
            if (game_state[p.row - 1][p.column + 1] == 0) {
                game_state[p.row - 1][p.column + 1] = 3;
                var nextP = new Point(p.row - 1, p.column + 1, p);
                queue.push(nextP);
            }
            if (game_state[p.row - 1][p.column] == 0) {
                game_state[p.row - 1][p.column] = 3;
                var nextP = new Point(p.row - 1, p.column, p);
                queue.push(nextP);
            }
            if (game_state[p.row][p.column - 1] == 0) {
                game_state[p.row][p.column - 1] = 3;
                var nextP = new Point(p.row, p.column - 1, p);
                queue.push(nextP);
            }
            if (game_state[p.row + 1][p.column] == 0) {
                game_state[p.row + 1][p.column] = 3;
                var nextP = new Point(p.row + 1, p.column, p);
                queue.push(nextP);
            }
            if (game_state[p.row + 1][p.column + 1] == 0) {
                game_state[p.row + 1][p.column + 1] = 3;
                var nextP = new Point(p.row + 1, p.column + 1, p);
                queue.push(nextP);
            }
        }
    }
    return null;
}

var availableMoves = [];
function checkMoves() {
    if (blue_dot.row % 2 == 0) //no offset
    {
        if (game_state[blue_dot.row - 1][blue_dot.column] == 0) {
            availableMoves.push("topright");
        }
        if (game_state[blue_dot.row][(blue_dot.column + 1)] == 0) {
            availableMoves.push("right");
        }
        if (game_state[blue_dot.row - 1][(blue_dot.column - 1)] == 0) {
            availableMoves.push("topleft");
        }
        if (game_state[(blue_dot.row + 1)][blue_dot.column] == 0) {
            availableMoves.push("botright");
        }
        if (game_state[blue_dot.row][(blue_dot.column - 1)] == 0) {
            availableMoves.push("left");
        }
        if (game_state[(blue_dot.row + 1)][blue_dot.column - 1] == 0) {
            availableMoves.push("botleft");
        }
    }
    else {
        if (game_state[(blue_dot.row - 1)][blue_dot.column + 1] == 0) {
            availableMoves.push("topright");
        }
        if (game_state[blue_dot.row][blue_dot.column + 1] == 0) {
            availableMoves.push("right");
        }
        if (game_state[(blue_dot.row - 1)][blue_dot.column] == 0) {
            availableMoves.push("topleft");
        }
        if (game_state[(blue_dot.row + 1)][blue_dot.column + 1] == 0) {
            availableMoves.push("botright");
        }
        if (game_state[blue_dot.row][(blue_dot.column - 1)] == 0) {
            availableMoves.push("left");
        }
        if (game_state[(blue_dot.row + 1)][blue_dot.column] == 0) {
            availableMoves.push("botleft");
        }
    }
}

function RandomMove() {
    checkMoves();
    (blue_dot.parent).row = blue_dot.row;
    (blue_dot.parent).column = blue_dot.column;
    if (availableMoves.length > 0) {
        var direction = Math.round(Math.random() * (availableMoves.length - 1));
        direction = availableMoves[direction];
        availableMoves = availableMoves.slice(0, 0);
    }
    else {
        victory_flag = 1;
        ctx.fillText("You win!", 800, 150);
        return;
    }
    if (blue_dot.row % 2 == 0) //no offset
    {
        if (direction == "topright") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row - 1][blue_dot.column] = 2;
            blue_dot.row = blue_dot.row - 1;
            blue_dot.column = blue_dot.column;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "right") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row][blue_dot.column + 1] = 2;
            blue_dot.row = blue_dot.row;
            blue_dot.column = blue_dot.column + 1;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "topleft") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row - 1][blue_dot.column - 1] = 2;
            blue_dot.row = blue_dot.row - 1;
            blue_dot.column = blue_dot.column - 1;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "botright") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row + 1][blue_dot.column] = 2;
            blue_dot.row = blue_dot.row + 1;
            blue_dot.column = blue_dot.column;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "left") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row][blue_dot.column - 1] = 2;
            blue_dot.row = blue_dot.row;
            blue_dot.column = blue_dot.column - 1;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "botleft") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row + 1][blue_dot.column - 1] = 2;
            blue_dot.row = blue_dot.row + 1;
            blue_dot.column = blue_dot.column - 1;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
    }
    else {
        if (direction == "topright") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row - 1][blue_dot.column + 1] = 2;
            blue_dot.row = blue_dot.row - 1;
            blue_dot.column = blue_dot.column + 1;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "right") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row][blue_dot.column + 1] = 2;
            blue_dot.row = blue_dot.row;
            blue_dot.column = blue_dot.column + 1;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "topleft") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row - 1][blue_dot.column] = 2;
            blue_dot.row = blue_dot.row - 1;
            blue_dot.column = blue_dot.column;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "botright") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row + 1][blue_dot.column + 1] = 2;
            blue_dot.row = blue_dot.row + 1;
            blue_dot.column = blue_dot.column + 1;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "left") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row][blue_dot.column - 1] = 2;
            blue_dot.row = blue_dot.row;
            blue_dot.column = blue_dot.column - 1;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
        if (direction == "botleft") {
            game_state[blue_dot.row][blue_dot.column] = 0;
            game_state[blue_dot.row + 1][blue_dot.column] = 2;
            blue_dot.row = blue_dot.row + 1;
            blue_dot.column = blue_dot.column;
            var myVar1 = setTimeout(animation, 100);
            var myVar2 = setTimeout(ClearScreen, 200);
            var myVar3 = setTimeout(UpdateScore, 200);
            return;
        }
    }
}


function fadeOut(col, row) {
    ctx.drawImage(document.getElementById("bluecircleanimated2"), col, row);
    setTimeout(function () {
        ClearScreen();
        UpdateScore();
        ctx.fillText("You lose!", 800, 150);
        animation_flag = 0;
    }, 500)
}

function EndAnimation() {
    display_game_state();
    if (blue_dot.row == 8) {
        ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + (blue_dot.column * 80), 10 + (blue_dot.row * 80) + 40);
        setTimeout(function () {
            ClearScreen();
            UpdateScore();
            fadeOut(10 + (blue_dot.column * 80), 10 + (blue_dot.row * 80) + 80);
        }, 500)
        return;
    }
    if (blue_dot.row == 0) {
        ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + (blue_dot.column * 80), 10 + (blue_dot.row * 80) - 40);
        setTimeout(function () {
            ClearScreen();
            UpdateScore();
            fadeOut(10 + (blue_dot.column * 80), 10 + (blue_dot.row * 80) - 80);
        }, 500)
        return;
    }
    if (blue_dot.row % 2 == 0) //no offset
    {
        if (blue_dot.column == 8) {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + (blue_dot.column * 80) + 40, 10 + (blue_dot.row * 80));
            setTimeout(function () {
                ClearScreen();
                UpdateScore();
                fadeOut(10 + (blue_dot.column * 80) + 80, 10 + (blue_dot.row * 80));
            }, 500)
        }
        else if (blue_dot.column == 0) {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + (blue_dot.column * 80) - 40, 10 + (blue_dot.row * 80));
            setTimeout(function () {
                ClearScreen();
                UpdateScore();
                fadeOut(10 + (blue_dot.column * 80) - 80, 10 + (blue_dot.row * 80));
            }, 500)
        }
    }
    else {
        if (blue_dot.column == 8) {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + (blue_dot.column * 80) + 40, 10 + (blue_dot.row * 80));
            setTimeout(function () {
                ClearScreen();
                UpdateScore();
                fadeOut(45 + (blue_dot.column * 80) + 80, 10 + (blue_dot.row * 80));
            }, 500)
        }
        else if (blue_dot.column == 0) {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + (blue_dot.column * 80) - 40, 10 + (blue_dot.row * 80));
            setTimeout(function () {
                ClearScreen();
                UpdateScore();
                fadeOut(45 + (blue_dot.column * 80) - 80, 10 + (blue_dot.row * 80));
            }, 500)
        }
    }
}

function doMouseDown(event) {
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;
    for (var j = 0; j < 9; j++) {
        for (var i = 0; i < 9; i++) {
            if (j % 2 == 0) {
                if ((canvas_x > 10 + (80 * i) && canvas_x < 10 + (80 * (i + 1))) && (canvas_y > 10 + (80 * j) && canvas_y < 10 + (80 * (j + 1)))) {
                    if (game_state[j][i] != 1 && game_state[j][i] != 2) {
                        if ((blue_dot.row == 8 || blue_dot.row == 0) || (blue_dot.column == 8 || blue_dot.column == 0)) {
                            if (game_state[blue_dot.row][blue_dot.column] == 2) {
                                game_state[j][i] = 1;
                                ClearScreen();
                                score++;
                                UpdateScore();
                            }
                            game_state[blue_dot.row][blue_dot.column] = 0;
                            if (!end_animation_flag) {
                                end_animation_flag = 1;
                                animation_flag = 1;
                                var myVar1 = setTimeout(EndAnimation, 500);
                            }
                        }
                        else {
                            if (victory_flag == 0) {
                                ClearScreen();
                                score++;
                                UpdateScore();
                                game_state[j][i] = 1;
                                queue = queue.slice(0, 0);
                                path = path.slice(0, 0);
                                var p = MazeSolver(blue_dot.row, blue_dot.column);

                                if (p == null) {
                                    random_movement_flag = 1;
                                    display_game_state();
                                    RandomMove();
                                }
                                else {
                                    while (p.getParent() != null) {
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
            else {
                if ((canvas_x > 45 + (80 * i) && canvas_x < 45 + (80 * (i + 1))) && (canvas_y > 10 + (80 * j) && canvas_y < 10 + (80 * (j + 1)))) {
                    if (game_state[j][i] != 1 && game_state[j][i] != 2) {
                        if ((blue_dot.row == 8 || blue_dot.row == 0) || (blue_dot.column == 8 || blue_dot.column == 0)) {
                            if (game_state[blue_dot.row][blue_dot.column] == 2) {
                                game_state[j][i] = 1;
                                ClearScreen();
                                score++;
                                UpdateScore();
                            }
                            game_state[blue_dot.row][blue_dot.column] = 0;
                            if (!end_animation_flag) {
                                end_animation_flag = 1;
                                animation_flag = 1;
                                var myVar1 = setTimeout(EndAnimation, 500);
                            }
                        }
                        else {
                            if (victory_flag == 0) {
                                ClearScreen();
                                score++;
                                UpdateScore();
                                game_state[j][i] = 1;
                                queue = queue.slice(0, 0);
                                path = path.slice(0, 0);
                                var p = MazeSolver(blue_dot.row, blue_dot.column);

                                if (p == null) {
                                    random_movement_flag = 1;
                                    display_game_state();
                                    RandomMove();
                                }
                                else {
                                    while (p.getParent() != null) {
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
    if ((canvas_x >= 800 && canvas_x <= 900) && (canvas_y >= 600 && canvas_y <= 700)) {
        if (animation_flag == 0) {
            reset_game_state();
            display_game_state();
        }
    }
}

