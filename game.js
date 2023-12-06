//TOP

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern=[];


var started = false;

var level = 0;


//kEYPRESS
$(document).keypress(function() {
    if (!started) {
      started = true;
      nextSequence();
    }
  });


//Check Answer
function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel
]){
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
        $("body").removeClass("game-over")
    },300);
    startOver();
}
}



// Next Sequence 
function nextSequence(){
    
  userClickedPattern = [];
  level++;

    $("#level-title").text("level "+level);

    //Generating Random Num
    var randomNumber = Math.trunc(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//Button click Handler
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern.length);
    console.log(userClickedPattern);
})

// Audio Play
function playSound(name){
var audio = new Audio ("sounds/"+name+".mp3");
audio.play();
}

//Animate Press
function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
},100);
};


//StartOver

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }

