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
const finalScore = document.getElementById('final-score');

var correctButton = document.getElementsByClassName('correct');
var wrongButton = document.getElementsByClassName('wrong');

let shuffledQuestions, currentQuestionIndex, quizTimer;

// events 

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Function to start the game

function startGame() {
    console.log("Started")
    startButton.classList.add('hide'),
    introText.classList.add('hide'),
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    quizTimerElement.classList.remove('hide')
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
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
       nextButton.classList.remove('hide') 
    } else {
       showScore();
    }
}

// timer function and variables


const startingMinutes = .5;
let time = startingMinutes * 60;

var countdown = setInterval(updateTimer, 1000)

function updateTimer() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    quizTimerElement.innerHTML = `${minutes}:${seconds}`;
    time--;

    if(time < 0) {
        clearInterval(countdown);
        showScore();
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

function showScore(){
    finalScore.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    // startButton.innerHTML = "Restart"
    // startButton.classList.remove('hide')
    // startButton.addEventListener('click', startGame)
    quizTimerElement.classList.add('hide')
}

function scoreboard(){}

/* next steps:
1) how to tally the score
2) enter initials submit button go to ScoreBoard Page 
3) style Scoreboard page
4) add a Restart Button on ScoreBoard page
5) debug timer - it is starting before pressing start 
6) debug the answer button sizes - various sizes, want uniform
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
            {text: "4", correct: true},
            {text: "22", correct: false}
        ]
    },
    {
        question: "What is 3 + 3?",
        answers: [
            {text: "6", correct: true},
            {text: "33", correct: false},
            {text: "option 3", correct: false}
        ]
    },
    {
        question: "What is 4 + 4?",
        answers: [
            {text: "44", correct: false},
            {text: "8", correct: true},
            {text: "option 3", correct: false},
            {text: "option 4", correct: false}
        ]
    }
]