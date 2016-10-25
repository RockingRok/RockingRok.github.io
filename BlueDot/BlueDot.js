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
    game_state[blue_dot.row][blue_dot.column] = 0;
    display_game_state();
    game_state[blue_dot.row][blue_dot.column] = 2;
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

function display_score() {
    ctx.fillText("Score: " + score, 800, 50);
}

function clear_screen(display_flag, increment_flag) {
    ctx.clearRect(0, 0, 1000, 1000);
    display_game_state();
    ctx.drawImage(document.getElementById("refresh"), 800, 600);
    if (increment_flag)
    {
        score++;
    }
    if (display_flag)
    {
        display_score();
    }
}

var path = []; // (row, col), (row, col), etc.
function bluedotmove_path() {
    game_state[blue_dot.row][blue_dot.column] = 0;
    (blue_dot.parent).row = blue_dot.row;
    (blue_dot.parent).column = blue_dot.column;
    blue_dot.row = path.shift();
    blue_dot.column = path.shift();
    path = path.slice(0, 0);
    var myVar1 = setTimeout(function () { animation_flag = 1; animation(); }, 100);
    var myVar2 = setTimeout(function () { clear_screen(1, 0); animation_flag = 0; }, 200);
}

var queue = [];
function queue_point(point, row_add, col_add)
{
    game_state[point.row+row_add][point.column+col_add] = 3;
    var nextP = new Point(point.row+row_add, point.column+col_add, point);
    queue.push(nextP);
}

function MazeSolver(row, column) {
    queue.push(new Point(row, column, null));
    while (queue.length != 0)
    {
        var p = queue.shift();

        if ((p.column == 0 || p.column == 8) || (p.row == 0 || p.row == 8)) {
            queue = queue.slice(0, 0);
            return p;
        }

        if (p.row % 2 == 0) //no offset
        {
            if (game_state[p.row][p.column + 1] == 0) {
                queue_point(p, 0, 1);
            }
            if (game_state[p.row - 1][p.column] == 0) {
                queue_point(p, -1, 0);
            }
            if (game_state[p.row - 1][p.column - 1] == 0) {
                queue_point(p, -1, -1);
            }
            if (game_state[p.row][p.column - 1] == 0) {
                queue_point(p, 0, -1);
            }
            if (game_state[p.row + 1][p.column - 1] == 0) {
                queue_point(p, 1, -1);
            }
            if (game_state[p.row + 1][p.column] == 0) {
                queue_point(p, 1, 0);
            }
        }
        else	//offset
        {
            if (game_state[p.row][p.column + 1] == 0) {
                queue_point(p, 0, 1);
            }
            if (game_state[p.row - 1][p.column + 1] == 0) {
                queue_point(p, -1, 1);
            }
            if (game_state[p.row - 1][p.column] == 0) {
                queue_point(p, -1, 0);
            }
            if (game_state[p.row][p.column - 1] == 0) {
                queue_point(p, 0, -1);
            }
            if (game_state[p.row + 1][p.column] == 0) {
                queue_point(p, 1, 0);
            }
            if (game_state[p.row + 1][p.column + 1] == 0) {
                queue_point(p, 1, 1);
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

function bluedotmove_rand(row_add, col_add)
{
    game_state[blue_dot.row][blue_dot.column] = 0;
    (blue_dot.parent).row = blue_dot.row;
    (blue_dot.parent).column = blue_dot.column;
    blue_dot.row = blue_dot.row + row_add;
    blue_dot.column = blue_dot.column + col_add;
    game_state[blue_dot.row][blue_dot.column] = 2;
    var myVar1 = setTimeout(function () { animation_flag = 1; animation(); }, 100);
    var myVar2 = setTimeout(function () { clear_screen(1, 0); animation_flag = 0; }, 200);
}

function RandomMove() {
    checkMoves();
    if (availableMoves.length > 0) {
        var direction = Math.round(Math.random() * (availableMoves.length - 1));
        direction = availableMoves[direction];
        availableMoves = availableMoves.slice(0, 0);
    }
    else {
        victory_flag = 1;
        ctx.fillText("You win!", 800, 150);
        return 1;
    }
    if (blue_dot.row % 2 == 0) //no offset
    {
        if (direction == "topright") {
            bluedotmove_rand(-1, 0);
        }
        if (direction == "right") {
            bluedotmove_rand(0, 1);
        }
        if (direction == "topleft") {
            bluedotmove_rand(-1, -1);
        }
        if (direction == "botright") {
            bluedotmove_rand(1, 0);
        }
        if (direction == "left") {
            bluedotmove_rand(0, -1);
        }
        if (direction == "botleft") {
            bluedotmove_rand(1, -1);
        }
    }
    else {
        if (direction == "topright") {
            bluedotmove_rand(-1, 1);
        }
        if (direction == "right") {
            bluedotmove_rand(0, 1);
        }
        if (direction == "topleft") {
            bluedotmove_rand(-1, 0);
        }
        if (direction == "botright") {
            bluedotmove_rand(1, 1);
        }
        if (direction == "left") {
            bluedotmove_rand(0, -1);
        }
        if (direction == "botleft") {
            bluedotmove_rand(1, 0);
        }
    }
}


function fadeOut(col, row) {
    ctx.drawImage(document.getElementById("bluecircleanimated2"), col, row);
    setTimeout(function () {
        clear_screen(1,0);
        ctx.fillText("You lose!", 800, 150);
        animation_flag = 0;
    }, 500)
}

function EndAnimation() {
    display_game_state();
    if (blue_dot.row == 8) {
        ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + (blue_dot.column * 80), 10 + (blue_dot.row * 80) + 40);
        setTimeout(function () {
            clear_screen(1,0);
            fadeOut(10 + (blue_dot.column * 80), 10 + (blue_dot.row * 80) + 80);
        }, 500)
        return;
    }
    if (blue_dot.row == 0) {
        ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + (blue_dot.column * 80), 10 + (blue_dot.row * 80) - 40);
        setTimeout(function () {
            clear_screen(1,0);
            fadeOut(10 + (blue_dot.column * 80), 10 + (blue_dot.row * 80) - 80);
        }, 500)
        return;
    }
    if (blue_dot.row % 2 == 0) //no offset
    {
        if (blue_dot.column == 8) {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + (blue_dot.column * 80) + 40, 10 + (blue_dot.row * 80));
            setTimeout(function () {
                clear_screen(1,0);
                fadeOut(10 + (blue_dot.column * 80) + 80, 10 + (blue_dot.row * 80));
            }, 500)
        }
        else if (blue_dot.column == 0) {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 10 + (blue_dot.column * 80) - 40, 10 + (blue_dot.row * 80));
            setTimeout(function () {
                clear_screen(1,0);
                fadeOut(10 + (blue_dot.column * 80) - 80, 10 + (blue_dot.row * 80));
            }, 500)
        }
    }
    else {
        if (blue_dot.column == 8) {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + (blue_dot.column * 80) + 40, 10 + (blue_dot.row * 80));
            setTimeout(function () {
                clear_screen(1,0);
                fadeOut(45 + (blue_dot.column * 80) + 80, 10 + (blue_dot.row * 80));
            }, 500)
        }
        else if (blue_dot.column == 0) {
            ctx.drawImage(document.getElementById("bluecircleanimated"), 45 + (blue_dot.column * 80) - 40, 10 + (blue_dot.row * 80));
            setTimeout(function () {
                clear_screen(1,0);
                fadeOut(45 + (blue_dot.column * 80) - 80, 10 + (blue_dot.row * 80));
            }, 500)
        }
    }
}

function game_controller(j, i)
{
    if ((blue_dot.row == 8 || blue_dot.row == 0) || (blue_dot.column == 8 || blue_dot.column == 0)) {
        game_state[j][i] = 1;
        clear_screen(1, 1);
        game_state[blue_dot.row][blue_dot.column] = 0;
        victory_flag = -1;
        animation_flag = 1;
        var myVar1 = setTimeout(EndAnimation, 500);
    }
    else {
        game_state[j][i] = 1;
        clear_screen(1, 1);
        var p = MazeSolver(blue_dot.row, blue_dot.column);

        if (p == null) {
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
            bluedotmove_path();
        }
    }
}

function doMouseDown(event) {
    var canvas_x = event.pageX;
    var canvas_y = event.pageY;
    if (!victory_flag && !animation_flag) {
        for (var j = 0; j < 9; j++) {
            for (var i = 0; i < 9; i++) {
                if (j % 2 == 0) {
                    if ((canvas_x > 10 + (80 * i) && canvas_x < 10 + (80 * (i + 1))) && (canvas_y > 10 + (80 * j) && canvas_y < 10 + (80 * (j + 1)))) {
                        if (game_state[j][i] != 1 && game_state[j][i] != 2) {
                            game_controller(j, i);
                        }
                    }
                }
                else {
                    if ((canvas_x > 45 + (80 * i) && canvas_x < 45 + (80 * (i + 1))) && (canvas_y > 10 + (80 * j) && canvas_y < 10 + (80 * (j + 1)))) {
                        if (game_state[j][i] != 1 && game_state[j][i] != 2) {
                            game_controller(j, i);
                        }
                    }
                }
            }
        }
    }
    if ((canvas_x >= 800 && canvas_x <= 900) && (canvas_y >= 600 && canvas_y <= 700) && (animation_flag == 0)) {
        reset_game_state();
        display_game_state();
    }
}

