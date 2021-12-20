//code adapted from https://www.codingnepalweb.com/quiz-app-with-timer-javascript/

//selecting all required elements
const hs_btn1 = document.querySelector("#hs_btn1");
const hs_btn2 = document.querySelector("#hs_btn2");
const hs_btn3 = document.querySelector("#hs_btn3");
const start_btn = document.querySelector("#start_btn");
const submit_btn = document.querySelector("#submit_btn");
const gb_btn = document.querySelector("#gb_btn");
const chs_btn = document.querySelector("#chs_btn");
const info_box = document.querySelector(".info_box")
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const hs_box = document.querySelector(".hs_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const timeCounter = document.querySelector(".timer_sec");
const final_results = document.querySelector("#final_results");
const quizTimeCounter = document.querySelector(".timer_sec_quiz");

let time = 75;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let widthValue = 0;

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    startTimer(75);
    setTimeout(()=>{
        showQuestions(0);
        }, 1000);  
}

// getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    const option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//if user clicked on option
function optionSelected(answer){ 
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    console.log("user answer: " + userAns);
    console.log("correct answer: " + correcAns);
    var right_wrong = document.querySelector(".right_wrong");
    if (userAns == correcAns) {
        let r_tag = '<span>' + "Correct" + '</span>';
        right_wrong.innerHTML = r_tag;
        console.log(r_tag);
    } else {
        let w_tag = '<span>' + "Wrong" + '</span>';
        right_wrong.innerHTML = w_tag;
        console.log(w_tag);
    }

    if (userAns == correcAns && (que_numb <= questions.length-1) && time>0) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        console.log(quizTimeCounter);
    } else if (userAns != correcAns && (que_numb <= questions.length-1) && time>0) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        timerPen();
        console.log(quizTimeCounter);
    } else if (userAns == correcAns && que_numb == questions.length && time>0) {
        showQuestions(que_count);
        clearInterval(counter);
        showResult();
        console.log(quizTimeCounter);
    } else if (userAns != correcAns && que_numb == questions.length && time>0) {
        showQuestions(que_count);
        timerPen();
        clearInterval(counter);
        showResult();
        console.log(quizTimeCounter);
    }
}

//QUESTIONS
let questions = [
    {
    numb: 1,
    question: "Commonly used data types DO Not include:",
    answer: "3. alerts",
    options: [
      "1. strings",
      "2. booleans",
      "3. alerts",
      "4. numbers"
    ]
  },
    {
    numb: 2,
    question: "Arrays in JavaScript can be used to store __________.",
    answer: "4. all of the above",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above"
    ]
  },
    {
    numb: 3,
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: "4. console.log",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log"
    ]
  },
    {
    numb: 4,
    question: "String values must be enclosed within________when being assigned to variables.",
    answer: "3. quotes",
    options: [
      "1. commas",
      "2. curly brackets",
      "3. quotes",
      "4. parenthesis"
    ]
  },
    {
    numb: 5,
    question: "The condition in an if / else statement is enclosed with_________.",
    answer: "3. parenthesis",
    options: [
      "1. quotes",
      "2. curly brackets",
      "3. parenthesis",
      "4. square brackets"
    ]
  },
];
    


//function to show results
function showResult(){
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult");
    const scoreText1 = result_box.querySelector("#user_score1");
    const scoreText2 = result_box.querySelector("#user_score2");
    scoreText1.innerHTML = quizTimeCounter.textContent;
    scoreText2.textContent = ` ${quizTimeCounter.textContent}`;
}

//function to save high scores; adapted from https://www.youtube.com/watch?v=DFhmNLKwwGw
const finalScore = document.getElementById("user_score2");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;
console.log(highScores);

finalScore.innerText = mostRecentScore;

function saveHighScore() {
    const initialsInput = document.querySelector("#initials").value;
    const score = {
        score: quizTimeCounter.textContent,
        name: initialsInput
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    console.log(highScores);
};

//function to handle high score; adapted from https://www.youtube.com/watch?v=jfOv18lCMmw
function hiScoreHandler(event) {
    const initialsInput = document.querySelector("#initials").value;
    if (!initialsInput) {
        alert("You need to enter your initials!");
        return false;
    }
  
    saveHighScore();

    const highScoresList = document.getElementById("highScoresList");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScoresList.innerHTML = highScores
        .map(highScores => {
            return `<li>${highScores.name} - ${highScores.score}</li>`;
        })
        .join("");

    result_box.classList.remove("activeResult");
    hs_box.classList.add("activeHs");
}

submit_btn.addEventListener("click", hiScoreHandler);

//function to reload start page
function goBack(event) {
    location.reload();
}

gb_btn.addEventListener("click", goBack);

//function to clear high scores
function clear(event) {
    localStorage.clear();
    highScoresList.textContent = ` `;
}

chs_btn.addEventListener("click", clear);

//function to go from info box to high score
function viewHiS1(event) {
    info_box.classList.remove("activeInfo");
    hs_box.classList.add("activeHs");
    const highScoresList = document.getElementById("highScoresList");
    const highScores = JSON.parse(localStorage.getItem("highScores"))
    highScoresList.innerHTML = highScores;
    highScoresList.innerHTML = highScores
        .map(highScores => {
            return `<li>${highScores.name} - ${highScores.score}</li>`;
        })
        .join("");
}

hs_btn1.addEventListener("click", viewHiS1);

//function to go from quiz box to high score
function viewHiS2(event) {
    quiz_box.classList.remove("activeQuiz"); 
    hs_box.classList.add("activeHs");
    const highScoresList = document.getElementById("highScoresList");
    const highScores = JSON.parse(localStorage.getItem("highScores"))
    highScoresList.innerHTML = highScores;
    highScoresList.innerHTML = highScores
        .map(highScores => {
            return `<li>${highScores.name} - ${highScores.score}</li>`;
        })
        .join("");
}

hs_btn2.addEventListener("click", viewHiS2);

//function to from result box to high score;
function viewHiS3(event) {
    result_box.classList.remove("activeResult"); 
    hs_box.classList.add("activeHs");
    const highScoresList = document.getElementById("highScoresList");
    const highScores = JSON.parse(localStorage.getItem("highScores"))
    highScoresList.innerHTML = highScores;
    highScoresList.innerHTML = highScores
        .map(highScores => {
            return `<li>${highScores.name} - ${highScores.score}</li>`;
        })
        .join("");
}

hs_btn3.addEventListener("click", viewHiS3);

//timer function
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        if(time>=0){
            console.log(quizTimeCounter, time);
            quizTimeCounter.innerHTML = time;
            time--;
        } else {
            clearInterval(counter);
            showResult();
        }
    }
}

//penalize function to subtract 10 seconds when wrong answer selected
function timerPen() {
    clearInterval(counter);
    time = quizTimeCounter.textContent - 10;
    quizTimeCounter.textContent = time;
    time--;
    startTimer(time);
}
