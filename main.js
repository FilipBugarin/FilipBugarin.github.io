

function start(){
    
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let targets = [];
    for(var i=0; i<1; i++){
        targets.push(new target());
    }

    initialize();
}

function initialize() {
    window.addEventListener('resize', resizeCanvas(), false);
    canvas.addEventListener('mousedown', function(event){
        var x = event.pageX;
        var y = event.pageY;

        for(var i = 0; i<targets.length ;i++){
            var element = targets[i]
            if ( Math.abs(x - element.location.x) < element.radius && Math.abs(y - element.location.y) < element.radius) {
                element.live = false;
                targets[i] = element;  
                redraw();
                break;
            }
        }
    }, false);
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "black";
    console.log("da")
    redraw();
}

function redraw() {
    console.log()
    for(var i = 0; i<targets.length ;i++){
        var t = targets[i];
        if(t.live){
            ctx.fillStyle = "white";
            ctx.fillRect(t.location.x, t.location.y, t.radius, t.radius);
        }
    }
}    



function target(){
    var x = Math.random()*window.innerWidth;
    var y = Math.random()*window.innerHeight;

    if(x<=50){
        x=x+100;
    }
    if(y<=50){
        y=y+100
    }

    this.location = {x: x- 50, y: y - 50};
    this.radius = 10;
    this.live = true;
    this.speedX = 3;
    this.speedY = 3;
}

