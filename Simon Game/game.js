
var btnClr =["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

$(".btn").click(function(){
    var userClr = $(this).attr("id");
    userPattern.push(userClr);
    playSound(userClr);
    animate(userClr);
    checkAnswer(userPattern.length-1);
});
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level"+level);
        nextSequence();
        started= true;
    }
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animate(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    } , 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userPattern[currentLevel]){
        console.log("sucess");
        if(gamePattern.length === userPattern.length){
           setTimeout(function(){
               nextSequence();
           }, 1000);
        }

    }
    else{
        $("h1").text("GAME OVER !! press any key to restart")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000)
        playSound("wrong");
        startOver();
    }
}
function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

function nextSequence(){
    userPattern=[];
    level++;
    $("#level-title").text("Level : "+level);

    var randNum = Math.floor(Math.random()*4);
    var randClr = btnClr[randNum];
    gamePattern.push(randClr);
    animate(randClr);
    playSound(randClr);
}