var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStart = false;
var level = 0;
// This function will work when the player starts the game and the level will go on, but if he press's wrong button , the game will over.

// This function will create the new patterns according to the levels
function nextSequence(){
    userClickedPattern = [];
    //Generating random numbers
    var randomNumber = Math.floor(Math.random()*4);

    level++;
    $("#score").text("Your Score: "+(level-1)*10);
    $("#level-title").text("Level "+level);

    //Using random number to get colours out of buttonColours array
    var randomChosenColour = buttonColours[randomNumber];

    //Pushing new random patterns at the end of gamePattern array
    gamePattern.push(randomChosenColour);

    //Using randomChosenColour variable to select buttons with their colour classes and adding animation
    $("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

$(".btn").click(function(){
    var userChosenColour = this.id;

    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


$(document).keydown(function(event){
    if((event.key==="S"||event.key==="s") && isGameStart===false){
        nextSequence();
        isGameStart=true;
        $("#level-title").text("Level "+level);
    }
});


function playSound(value){
    var audio = new Audio("sounds/"+value+".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("SUCCESS");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press 'R' to Restart");
        playSound("wrong");
    }
}

$(document).keydown(function(event){
    if((event.key==='R'||event.key==='r')){
        startOver();
    }
});

function startOver(){
    level=0;
    gamePattern=[];
    isGameStart=false;
    nextSequence();
}

