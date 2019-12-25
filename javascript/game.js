var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;

// * This functions will called the next button to be clicked on the squence
// * It will also get the button that was called and put it inside the gamePattern array and play audio 
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;
    $("h1").text(`Level ${level}`);
}

// * This will add a click function to all the buttons that will capture the IDs and put it inside an array
$("button").on("click", function (e) {
    var userChosenButton = e.target.id;
    userClickedPattern.push(userChosenButton);

    playSound(userChosenButton);
    animatePress(userChosenButton);

    checkAnswer(userClickedPattern.length - 1);
    started = false;

});

// * Function that will play the audio when an event occurs
function playSound(id) {
    var audio = new Audio(`/sounds/${id}.mp3`);
    audio.play();
}

// * This functions will animate the buttons when a User clicks on them
function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(function (e) {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

// *To start the game and listener is needed. This will add it to the docuemment so when any key is pressed the game will start
$(document).on("keypress", function (e) {
    if (started) {
        $("h1").text(`Level ${level}`);
        nextSequence();

    }
    started = false;
})

// *Checks the anwers that the userinputs to the gamepattern array to see if they got it correct
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function (e) {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }

    } else {
        var wrong = new Audio("/sounds/wrong.mp3")
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function (e) {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over :(")

        startOver();
    }
}

// *Resets everything to zero
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = true;

}