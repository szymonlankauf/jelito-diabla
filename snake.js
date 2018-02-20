/**
 * Created by szymon on 18.02.18.
 */
(function() {

    function Map(map) {
        this.map = map;

        this.mapHeight = 10;
        this.mapWidth = 10;

        this.snakeBody = [];
        this.snakeBody[0] = [4,4];
        this.snakeBody[1] = [3,4];
        this.snakeBody[2] = [2,4];

        this.direction = "down";
        this.oneDirection = "down";
        this.time = 200;

        for( var i = 0; i < this.mapHeight; i++ ) {
            this.row = $("<div class='row'></div>");
            for( var j = 0; j < this.mapWidth; j++ ){
                this.row.append($("<div class='field' data-x='"+i+"' data-y='"+j+"'></div>"));
            }
            this.map.append(this.row);
        }

        this.snakeInit(this.snakeBody);

        this.oneDirection = this.listener();

        this.theGame(this.oneDirection);

    }






    var snakeTail = [];
    var bugLocation = [7,8];
    var buggy = $("div.field[data-x='"+bugLocation[0]+"'][data-y='"+bugLocation[1]+"']");
    buggy.css("background-color", "blue");

    for(var i = 1; i <snakeBody.length; i++) {
        snakeTail[i-1]=snakeBody[i];
    }

    Map.prototype.listener = function() {
        document.addEventListener('keypress', function(event) {

            var keyName = event.key;
            var oneDirection = this.oneDirection;
            switch(keyName) {
                case 'ArrowRight':
                    oneDirection = "right";
                    break;
                case 'ArrowLeft':
                    oneDirection = "left";
                    break;
                case 'ArrowUp':
                    oneDirection = "up";
                    break;
                case 'ArrowDown':
                    oneDirection = "down";
                    break;
            }
            return oneDirection;
        });
    };

    Map.prototype.snakeInit = function(snakeBody){
        snakeBody.forEach(function(e) {
        var body = $("div[data-x='" + e[0] + "'][data-y='" + e[1] + "']");
        body.css("background-color", "black");
    });
    };

    Map.prototype.theGame = function(oneDirection) {
        setInterval(function () {

            this.checkDirection(this.oneDirection);


            switch (direction) {
                case 'down':
                    snakeBody.unshift([snakeBody[0][0] + 1, snakeBody[0][1]]);
                    break;
                case 'up':
                    snakeBody.unshift([snakeBody[0][0] - 1, snakeBody[0][1]]);
                    break;
                case 'left':
                    snakeBody.unshift([snakeBody[0][0], snakeBody[0][1] - 1]);
                    break;
                case 'right':
                    snakeBody.unshift([snakeBody[0][0], snakeBody[0][1] + 1]);
                    break;
            }

            var snakeEnd = $("div.field[data-x='" + snakeBody[snakeBody.length - 1][0] + "'][data-y='" + snakeBody[snakeBody.length - 1][1] + "']");
            var body = $("div[data-x='" + snakeBody[0][0] + "'][data-y='" + snakeBody[0][1] + "']");
            snakeEnd.css("background-color", "aliceblue");
            body.css("background-color", "black");


            if (snakeBody[0][0] !== bugLocation[0] || snakeBody[0][1] !== bugLocation[1]) {
                snakeBody.pop();
            } else {
                do {
                    var bugx = Math.floor(mapHeight * Math.random());
                    var bugy = Math.floor(mapWidth * Math.random());
                }
                while (snakeBody.some(function (segment) {
                    return segment[0] === bugx && segment[1] === bugy;
                }));
                console.log(bugx, bugy);
                bugLocation = [bugx, bugy];
                buggy = $("div.field[data-x='" + bugLocation[0] + "'][data-y='" + bugLocation[1] + "']");
                buggy.css("background-color", "blue");
            }
            if (snakeBody[0][0] === mapHeight || snakeBody[0][0] === -1 || snakeBody[0][1] === mapWidth || snakeBody[0][1] === -1) {
                clearInterval(theGame);
                var over = $("p#over");
                over.append('Game Over! ' + snakeBody.length)
            }

            for (var i = 1; i < snakeBody.length; i++) {
                snakeTail[i - 1] = snakeBody[i];
            }

            if (snakeTail.some(function (snakePart) {
                    return snakePart[0] === snakeBody[0][0] && snakePart[1] === snakeBody[0][1];
                })) {
                clearInterval(theGame);
                var over = $("p#over");
                over.append('Game Over!' + snakeBody.length)
            }
            ;

        }, time);

    }

    Map.prototype.checkDirection = function(oneDirection){
        var direction = this.direction;
        switch (oneDirection) {
            case 'down':
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
            case 'up':
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 'left':
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 'right':
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
        }
    }

    var map1 = new Map($("div#map"));

    // var head = $("div[data-x='4'][data-y='4']");
    // head.css("background-color","black");
    // for( var k =3; k > 1; k-- ) {
    //     var body = $("div[data-x='"+k+"'][data-y='4']");
    //     body.css("background-color","black");
    // }

})();