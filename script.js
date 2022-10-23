// What does the app need to do?
// Start the game
// Set next question 
// Select Answer
// Calculate Score
// Interactive Timer

// variables

const introText = document.getElementById('intro-text');
const startButton = document.getElementById('start-btn');
const quizTimerElement = document.getElementById('timer');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const submitButton = document.getElementById('submit-btn');
const finalScore = document.getElementById('final-score');
const scoreboardElement = document.getElementById('scoreboard');
const scoreboardList = document.getElementById('scoreboardList');
const initials = document.querySelector('#initials');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const scoreCounter = document.getElementById('score-counter');
const MAX_HIGH_SCORES = 5;
const highScoresList = JSON.parse(localStorage.getItem('highScoresList')) || [];

var correctButton = document.getElementsByClassName('correct');
var wrongButton = document.getElementsByClassName('wrong');

let score = 0;
let shuffledQuestions, currentQuestionIndex, quizTimer;
let selectedButton;

// events 

startButton.addEventListener('click', startGame);
startButton.addEventListener('click', startTimer);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
submitButton.addEventListener('click', scoreboard);


// Function to start the game

function startGame() {
    console.log("Started")
    startButton.classList.add('hide'),
        introText.classList.add('hide'),
        shuffledQuestions = questionsArray.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    score = 0
    quizTimerElement.classList.remove('hide')
    scoreboardElement.classList.add('hide')
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    // increase score if statement
    if (correct) {
        score = score + 5; //increases scoreCounter by 5 for correct answer
    } else {
        time = time - 15; //time penalty by 15 seconds for wrong answer
    }
    localStorage.setItem('mostRecentScore', score);
   
    // end of questions 
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        showScore();
        time = 0;
    }
}


// timer function and variables

const startingMinutes = 2;
let time = startingMinutes * 60;

function startTimer() {
    var countdown = setInterval(updateTimer, 1000)

    function updateTimer() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        var correct = answerButtonsElement.dataset.correct;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        quizTimerElement.innerHTML = `Timer: ${minutes}:${seconds}`;
        time--;

        if (time < 0) {
            clearInterval(countdown);
            alert("GAME OVER")
            showScore()
        } 
    
        console.log(time);
    }
}



function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// shows final score landing page 
function showScore() {
    finalScore.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    quizTimerElement.classList.add('hide')
    nextButton.classList.add('hide')
    clearStatusClass(document.body)
}

// scoreboard 

scoreCounter.innerHTML = mostRecentScore;

// cannot figure out why local storage mostRecentScore is correct, but display scoreCounter = mostRecentScore, is showing the previous player's score. 
// cannot figure out why the current mostRecentScore is not displaying on the scoreboard until the following round 

initials.addEventListener('keyup', () => {
    console.log(initials.value);
    submitButton.disabled = !initials.value;
})

saveHighScore = (e) => {
    console.log("clicked submit");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: initials.value
    };
    highScoresList.push(score);
    highScoresList.sort((a,b) => {
        return b.score - a.score;
    });
    highScoresList.splice(5);
    localStorage.setItem('highScoresList', JSON.stringify(highScoresList));

    highScoresList.push(mostRecentScore);
    console.log(highScoresList);
};

// next page - Scoreboard 
scoreboardList.innerHTML = 
highScoresList.map(score => {
   return `<li class="name-score">${score.name} - ${score.score}</li>`;
}).join("");
console.log(scoreboardList);


function scoreboard() {
    finalScore.classList.add('hide')
    scoreboardElement.classList.remove('hide')
    // startButton.innerHTML = "Restart"
    // startButton.classList.remove('hide')
    // startButton.addEventListener('click', startGame)
}

// Questions 

const questionsArray = [
    {
        question: "Inside which HTML element do you place your JavaScript code?",
        answers: [
            { text: "<script>", correct: true },
            { text: "<meta>", correct: false },
            { text: "<link>", correct: false },
            { text: "<head>", correct: false }
        ]
    },
    {
        question: "What selector would you use to select a class in css?",
        answers: [
            { text: "#", correct: false },
            { text: "*", correct: false },
            { text: ":", correct: false },
            { text: ".", correct: true }
        ]
    },
    {
        question: "What operator would you use to make the expression true? 8 __ '8' ",
        answers: [
            { text: "=", correct: false },
            { text: "==", correct: true },
            { text: "===", correct: false },
            { text: "=>", correct: false }
        ]
    },
    {
        question: "A variable that is defined within a function is known as _____ scope?",
        answers: [
            { text: "Outside", correct: false },
            { text: "Inside", correct: false },
            { text: "Local", correct: true },
            { text: "Global", correct: false }
        ]
    },
    {
        question: "Which index is the letter 'D' on from the following array? ['A', 'B', 'C', 'D'] ",
        answers: [
            { text: "2", correct: false },
            { text: "1", correct: false },
            { text: "3", correct: true },
            { text: "0", correct: false }
        ]
    }
]

// questions draft area:
// "Inside which HTML element do you place your JavaScript code?" "<script>"** "<meta>" "<link>" "<head>"
// "What selector would you use to select a class in css?" "#"  "*" ":" "."**
// "What operator would you use to make the expression true? 8 __ '8' " "=" "=="** "===" "=>"
// A variable that is defined within a function is known as _____ scope? "Outside" "Inside" "Local"** "Global"
// Which index is the letter 'D' on from the following array: ['A', 'B', 'C', 'D']?  "2", "1", "3",** "0"