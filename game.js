buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];
userClickedPattern = [];

level = 0;
var start = false;

document.addEventListener("keydown", function (event) {
  var a = event.key;
  if (!start && (a == 'a') || (a == 'A')) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
})


$(".btn").click(function (event) {
  if (start) {
    var userChosenColour = event.target.id;
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);
    var l = userClickedPattern.length;
    checkAnswer(l - 1);
  }
});

function animatePress(key) {
  $("." + key).addClass("pressed");
  setTimeout(function () {
    $("." + key).removeClass("pressed");
  }, 100);
  sound(key);
}

function sound(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}

function checkAnswer(a) {
  if (userClickedPattern[a] === gamePattern[a]) {
    console.log("Success")
    if (a + 1 === gamePattern.length) {
      level++;
      $("#level-title").text("Level " + level);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    sound("wrong");
    $("body").addClass("game-over");
    $('#level-title').text("GAME OVER, Press A to restart");

    setTimeout(function () {
      $('body').removeClass("game-over")
    }, 200);

    level = 0;
    gamePattern = [];
    start = false;
  }
}

function nextSequence() {
  var r = Math.floor(Math.random() * 3);
  randomChosenColour = buttonColours[r];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeOut(250).fadeIn(250);
  sound(randomChosenColour);
  userClickedPattern = [];
}