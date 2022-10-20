// constant variables
const restartBtn = document.getElementById('restart');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('submit');
const submitBtn = document.getElementById('submit');
const trueBtn = document.getElementById('True');
const falseBtn = document.getElementById('False');
const userScore = document.getElementById('user-score');
const questionText = document.getElementById('question-text');

// question counter

// score counter

// array of questions 

let currentQuestion = 0;
var score = 0;

let questions = [
    // Question 1
    {
        question: "Example Question 1?",
        answers: [
            {option:"Answer A", answer:true},
            {option:"Answer B", answer:false}
        ]
    },
    // Question 2
    {
        question: "Example Question 2?",
        answers: [
            {option:"Answer A", answer:true},
            {option:"Answer B", answer:false}
        ]
    },
     // Question 3
     {
        question: "Example Question 3?",
        answers: [
            {option:"Answer A", answer:true},
            {option:"Answer B", answer:false}
        ]
    }
]

// click events
restartBtn.addEventListener('click', restart);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
submitBtn.addEventListener('click', submit);

// main quiz function
function beginQuiz() {
    currentQuestion = 0;
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
    trueBtn.onclick = () => {
        let ano=0;
        if(questions[currentQuestion].answers[ano].answer) {
            if(score < 3) {
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion < 2) {
            next();
        }
    }
    prevBtn.classList.add('hide');
}

beginQuiz();

// restart the quiz function
function restart() {
    currentQuestion = 0;
    prevBtn.classList.remove('hide');
    nextBtn.classList.remove('hide');
    submitBtn.classList.remove('hide');
    trueBtn.classList.remove('hide');
    falseBtn.classList.remove('hide');
    score = 0;
    userScore.innerHTML = score;
    beginQuiz();
}

// next function to move to next question
function next() {
    currentQuestion++;
    if(currentQuestion >= 2){
        nextBtn.classList.add('hide');
        prevBtn.classList.remove('hide');
    }
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
    trueBtn.onclick = () => {
        let ano = 0;
        if (questions[currentQuestion].answers[ano].answer){
            if(score < 3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion < 2 ){
            next();
        }
    }
    falseBtn.innerHTML = questions[currentQuestion].answers[1].option;
    falseBtn.onclick = () => {
        let ano = 1;
        if (questions[currentQuestion].answers[ano].answer){
            if(score < 3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion < 2 ){
            next();
        }
    }
    prevBtn.classList.remove('hide');
}

// previous function to move to previous question 
function prev() {
    currentQuestion--;
    if(currentQuestion <= 0){
        prevBtn.classList.add('hide');
        nextBtn.classList.remove('hide');
    }
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
    trueBtn.onclick = () => {
        let ano = 0;
        if (questions[currentQuestion].answers[ano].answer){
            if(score < 3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion < 2 ){
            next();
        }
    }
    falseBtn.innerHTML = questions[currentQuestion].answers[1].option;
    falseBtn.onclick = () => {
        let ano = 1;
        if (questions[currentQuestion].answers[ano].answer){
            if(score < 3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentQuestion < 2 ){
            next();
        }
    }
    nextBtn.classList.remove('hide');
}

// submit function to complete quiz
function submit(){
    prevBtn.classList.add('hide');
    nextBtn.classList.add('hide');
    submitBtn.classList.add('hide');
    trueBtn.classList.add('hide');
    falseBtn.classList.add('hide');
    questionText.innerHTML = "Congratulations on completing the quiz!"
}