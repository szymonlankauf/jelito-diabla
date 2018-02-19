/**
 * Created by szymon on 18.02.18.
 */
(function() {

    var mapHeight = 10,
        mapWidth = 10;
    
    var map = $("div#map");
    for( var i = 0; i < mapHeight; i++ ) {
        var row = $("<div class='row'></div>");
        for( var j = 0; j < mapWidth; j++ ){
            row.append($("<div class='field' data-x='"+i+"' data-y='"+j+"'></div>"));
        }
        map.append(row);
    }

    var direction = "down";
    var oneDirection = "down";
    var time = 200;

    var snakeBody = [];
    snakeBody[0] = [4,4];
    snakeBody[1] = [3,4];
    snakeBody[2] = [2,4];
    var snakeTail = [];
    var bugLocation = [7,8];
    var buggy = $("div.field[data-x='"+bugLocation[0]+"'][data-y='"+bugLocation[1]+"']");
    buggy.css("background-color", "blue");

    for(var i = 1; i <snakeBody.length; i++) {
        snakeTail[i-1]=snakeBody[i];
    }

    document.addEventListener('keypress', function(event) {

       var keyName = event.key;
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
       console.log(keyName);
    });

    snakeBody.forEach(function(e) {
        var body = $("div[data-x='" + e[0] + "'][data-y='" + e[1] + "']");
        body.css("background-color", "black");
    });

    var theGame = setInterval(function(){
        switch(oneDirection) {
            case 'down':
                if(direction!=='up') {
                    direction = 'down';}
                break;
            case 'up':
                if(direction!=='down') {
                    direction = 'up';}
                break;
            case 'left':
                if(direction!=='right') {
                    direction = 'left';}
                break;
            case 'right':
                if(direction!=='left') {
                    direction = 'right';}
                break;
        }

        switch(direction) {
            case 'down':
                snakeBody.unshift([snakeBody[0][0]+1,snakeBody[0][1]]);
                break;
            case 'up':
                snakeBody.unshift([snakeBody[0][0]-1,snakeBody[0][1]]);
                break;
            case 'left':
                snakeBody.unshift([snakeBody[0][0],snakeBody[0][1]-1]);
                break;
            case 'right':
                snakeBody.unshift([snakeBody[0][0],snakeBody[0][1]+1]);
                break;
        }

        var snakeEnd = $("div.field[data-x='"+snakeBody[snakeBody.length-1][0]+"'][data-y='"+snakeBody[snakeBody.length-1][1]+"']");
        var body = $("div[data-x='" + snakeBody[0][0] + "'][data-y='" + snakeBody[0][1] + "']");
        snakeEnd.css("background-color", "aliceblue");
        body.css("background-color", "black");


        if(snakeBody[0][0]!==bugLocation[0] || snakeBody[0][1]!==bugLocation[1]) {
            snakeBody.pop();
        } else {
            do{
                var bugx = Math.floor(mapHeight*Math.random());
                var bugy = Math.floor(mapWidth*Math.random());
            }
            while(snakeBody.some(function(segment){
                return segment[0]===bugx && segment[1]===bugy;
            }));
            console.log(bugx, bugy);
            bugLocation = [bugx,bugy];
            buggy = $("div.field[data-x='"+bugLocation[0]+"'][data-y='"+bugLocation[1]+"']");
            buggy.css("background-color", "blue");
        }
        if(snakeBody[0][0]===mapHeight || snakeBody[0][0]===-1 || snakeBody[0][1]===mapWidth || snakeBody[0][1]===-1){
            clearInterval(theGame);
            var over = $("p#over");
            over.append('Game Over! ' + snakeBody.length)
        }

        for(var i = 1; i <snakeBody.length; i++) {
            snakeTail[i-1]=snakeBody[i];
        }

        if(snakeTail.some(function(snakePart) {
            return snakePart[0]===snakeBody[0][0] && snakePart[1]===snakeBody[0][1];
            })) {
            clearInterval(theGame);
            var over = $("p#over");
            over.append('Game Over!' + snakeBody.length)
        };

    },time);


    // var head = $("div[data-x='4'][data-y='4']");
    // head.css("background-color","black");
    // for( var k =3; k > 1; k-- ) {
    //     var body = $("div[data-x='"+k+"'][data-y='4']");
    //     body.css("background-color","black");
    // }

})();