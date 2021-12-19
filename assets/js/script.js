// MODULE 4 CHALLENGE
// Goal: to create a timer based coding quiz application that stores high scores using client-side storage


//START OF QUIZ CODE
// Create variables to strore the quiz questions

let start = document.getElementById("start");

let question = document.getElementById("question");

let choiceA = document.getElementById("A");

let choiceB = document.getElementById("B");

let choiceC = document.getElementById("C");

let counter = document.getElementById("counter");

let timeGauge = document.getElementById("timeGauge");

let progress = document.getElementById("progress");

let scoreDiv = document.getElementById("scoreContainer");


// pages variables
let quizPage = document.getElementById("quiz-page");
let landingPage = document.getElementById("landing-page")
let timer = document.getElementById("timer");
let scoreContainer = document.getElementById("score-container")

// Use mouse-click events to start the quiz
function startQuiz(){
    display();
    quizPage.classList.remove('display');
    timer.classList.remove('display')

    timeLeft = quizTime;

    let timerInterval = setInterval(() => {
        timeLeft --;
        timer.textContent = "Time "+ timeLeft;

        if(timeLeft === 0){
            clearInterval(timerInterval)

            // invoke the function that stops the game
            timer.classList.add('display')
            quizPage.classList.add('display');
            scoreContainer.classList.remove('display')
        }
        
    }, 1000);
}

start.addEventListener("click",startQuiz);

// use for loops to cycle through quiz questions
// use key-press events to recieve user input in the form of answers to questions
let questions = [
    
    {
        
        question : "What does HTML stand for?",
        
        imgSrc : " ",
        
        choiceA : "Correct",
        
        choiceB : "Wrong",
        
        choiceC : "Wrong",
        
        correct : "A"
        
    },{
        
        question : "What does CSS stand for?",
        
        imgSrc : " ",
        
        choiceA : "Wrong",
        
        choiceB : "Correct",
        
        choiceC : "Wrong",
        
        correct : "B"
        
    },{
        
        question : "What does JS stand for?",
        
        imgSrc : " ",
        
        choiceA : "Wrong",
        
        choiceB : "Wrong",
        
        choiceC : "Correct",
        
        correct : "C"

    }

];

// create a time limit for the game using time functions
let pages = [quizPage, landingPage, timer, scoreContainer];
let quizTime = 10;
timer.textContent = "Time " + quizTime;
let timeLeft;

function display(){
    for (let i = 0; i < pages.length; i++) {
        if(!pages[i].classList.contains('display')){
            pages[i].classList.add('display')
        }
        
    }
}

let lastQuestion = questions.length - 1;

let runningQuestion = 0;

function renderQuestion(){

    let q = questions[runningQuestion];

   

    question.innerHTML = "<p>"+ q.question +"</p>";

    choiceA.innerHTML = q.choiceA;

    choiceB.innerHTML = q.choiceB;

    choiceC.innerHTML = q.choiceC;

}
function renderProgress(){

    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){

        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";

    }

}

// write conditional statements to determine wrong and right answers
// use client-side storage to store high scores