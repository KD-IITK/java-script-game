var gamePattern = [] ;
var buttonColours = ["red" , "blue" , "green" , "yellow"];
var userClickedPattern = [];
var level = 0;
$(document).one("keypress" , function (){
    $("h1").text("level " + level);
    nextSequence();
})
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
$(".btn").click(function (){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000)
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart"); 
        
        $(document).one("keypress" , function (){
            $("h1").text("level " + level);
            startOver();
        })
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
}


