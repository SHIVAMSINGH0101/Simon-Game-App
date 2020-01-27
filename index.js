var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var firstTime = false;

var level = 0;

//game starts on click of keyboard key
$(document).on("keypress", function() {

  if (!firstTime) {
    $("#level-title").text("Level " + level);
    nextSequence();
    firstTime = true;
  }
});

// get what color user clicked
$(".btn").on("click", function(event) {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
// check whether that particular color matches with game sequence of that index
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
//to check whether the order in which user clicks on color matches with the order of game sequence
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //to check the total user clicked sequence matches with game sequence i.e. matches only when each color matches
    //which we checked on previous "if" and length of both sequences are same
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        // if sequence matches than call nextSequence to increase level
        nextSequence();
      }, 1000);
    }

  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 500);

    startOver();
  }

}

function nextSequence() {
  // re initializes user clicked sequence on each level
  userClickedPattern = [];
  level = level + 1;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}



function startOver() {
  level = 0;
  gamePattern = [];
  firstTime = false;
}
