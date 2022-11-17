const numberOfTargets = 20;
const sizeOfTargets = 20;
const maxSpeed = 3;

let ctx
let width
let height
let canvas
let targets
let interval

function start(){
    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    width = window.innerWidth;
    height = window.innerHeight;
    
    targets = [];
    for(var i=0; i<Math.random()*numberOfTargets; i++){
        targets.push(new target());
    }

    initialize();

    interval = setInterval(updateGame, 20);
}

function updateGame(){
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    redraw();
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
                break;
            }
        }
    }, false);
    resizeCanvas();
}

function updateTargetPosition(i){

    var x = targets[i].location.x;
    var y = targets[i].location.y;

    if(x - sizeOfTargets/2 < 0){
        targets[i].speedX = Math.random() * maxSpeed;
    }else if(x + sizeOfTargets/2 >= ctx.canvas.width){
        targets[i].speedX = -Math.random() * maxSpeed;
    }

    if(y - sizeOfTargets/2 < 0){
        targets[i].speedY = Math.random() * maxSpeed;
    }else if(y + sizeOfTargets/2 >= ctx.canvas.height){
        targets[i].speedY = -Math.random() * maxSpeed;
    }

    if(targets[i].speedX > 8)
        console.log(targets[i].speedX)
    if(targets[i].speedY > 8)
        console.log(targets[i].speedY)

    targets[i].location.x = x + targets[i].speedX;
    targets[i].location.y = y + targets[i].speedY;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "black";
    redraw();
}

function redraw() {
    var numberOfLive = 0;
    for(var i = 0; i<targets.length ;i++){
        var t = targets[i];
        if(t.live){
            updateTargetPosition(i)
            numberOfLive = numberOfLive+1;
            ctx.fillStyle = "white";
            ctx.fillRect(t.location.x, t.location.y, t.radius, t.radius);
        }
    }

    if(numberOfLive == 0){
        start();
    }

    generateText()
}   

function generateText(){
    ctx.font = '100 40px Roboto';
    ctx.textAlign = 'right';
    ctx.fillText(
        `Caught ${targets.filter(e => !e.live).length}/${targets.length}`,
        canvas.width - 15,
        50
    );
};



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
    this.radius = sizeOfTargets;
    this.live = true;

    if(Math.random()<0.5){
        this.speedX = Math.random() * maxSpeed
    }else{
        this.speedX = -Math.random() * maxSpeed
    }

    if(Math.random()<0.5){
        this.speedY = Math.random() * maxSpeed
    }else{
        this.speedY = -Math.random() * maxSpeed
    }

}

