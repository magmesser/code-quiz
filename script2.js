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
const scoreCounter = document.getElementById('score-counter');
const scoreboardElement = document.getElementById('scoreboard');

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
        shuffledQuestions = questions.sort(() => Math.random() - .5)
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

    scoreCounter.innerHTML = score;
    console.log(score)

    // end of questions 
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        showScore();
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
            showScore();
        }
        // console.log(time);
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
    clearStatusClass(document.body)
}



function scoreboard() {
    finalScore.classList.add('hide')
    scoreboardElement.classList.remove('hide')
    startButton.innerHTML = "Restart"
    startButton.classList.remove('hide')
    startButton.addEventListener('click', startGame)
}



/* next steps:
2) update the scoreboard page with local storage initials and score
3) style Scoreboard page
5) debug:
    debug the answer button sizes - various sizes, want uniform
    debug - last question format, have next button show to take to final score page 
6) update questions 
7) check code online
8) fix any other bugs
9) update the read me
10) submit
*/


// Questions 

const questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "4", correct: true },
            { text: "22", correct: false }
        ]
    },
    {
        question: "What is 3 + 3?",
        answers: [
            { text: "6", correct: true },
            { text: "33", correct: false },
            { text: "option 3", correct: false }
        ]
    },
    {
        question: "What is 4 + 4?",
        answers: [
            { text: "44", correct: false },
            { text: "8", correct: true },
            { text: "option 3", correct: false },
            { text: "option 4", correct: false }
        ]
    }
]

// "Inside which HTML element do you place your JavaScript code?" "<script>"** "<meta>" "<link>" "<head>"
// "What selector would you use to select a class in css?" "#"  "*" ":" "."**
// "What operator would you use to make the expression true? 8 __ '8' " "=" "=="** "===" "=>"