var buttonColors  = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var started = 0;
var level = 0;
var startBtnStart = 0;

$('#stbtn').on('click', function() {
    started = 1;
    nextSequence();
});

$('.btn').on('click', function() {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern);
});

$(document).on('keypress', (event) => {
    if(started && ((event.key==='w') || (event.key==='e') || (event.key==='s') || (event.key==='d'))) {
        var userChosenColor = findColor(event.key);
        console.log(userChosenColor);
        playSound(userChosenColor);
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
        console.log(userClickedPattern);
    }
});

$(document).on('keydown', function(event) {
    console.log(event.key);
    if(!started && event.key === 'Enter') {
        started = 1;
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $('h1').text('Level ' + (++level));
}

function    playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $('#'+ currentColor).addClass('pressed');
    setTimeout(function() {
        $('#'+ currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success');
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('h1').html(`Game Over!!! Your Score is <span style="color : #4ef037">${level - 1}</span>, Press <em style="color : red">"Enter"</em> Key or Press This Button <button id="restbtn">RESTART</button> to Restart`);
        startOver();
    }  
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = 0;
}

$('body').on('click', '#restbtn', function() {
    started = 1;
    level = 0;
    gamePattern = [];
    nextSequence();
});

function findColor(key) {
    if(key === 'w')
        return 'green';
    else if(key === 'e')
        return 'red';
    else if(key === 's')
        return 'yellow';
    else if(key === 'd')
        return 'blue';
}

$('#gitLink').on('click', function() {
    window.open("https://github.com/ARITRA-DEY-117/Simon_Game", "_blank");
});
