const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons');
const feedbackContainerEl = document.getElementById('feedback-container');
let answered = false;
let shuffledQuestions, currentQuestionIndex;
let time = 60;

let highscore = JSON.parse(localStorage.getItem("highscores")) || [];
let currentScore = 0
// [
//     {
//         initials: '', score: 0
//     }
// ]

//ADD TIMER

var startTimer = setInterval(() => {
    time -= 1;
    var timerDisplay = document.createElement("p")
    body.appendChild(timerDisplay);
}, 1000)


const questions = [
    {
        question: "which datatype is primitive?",
        answers: [
            {text: 'boolean', correct: true},
            {text: 'array', correct: false}
        ]
    },
    {
        question: "which is not a falsy value?",
        answers: [
            {text: '0', correct: false},
            {text: '"nothing"', correct: true}
        ]
    },
    {
        question: "A function passed as an argument to another function is called what?",
        answers: [
            {text: 'a function sequence', correct: false},
            {text: 'a callback function', correct: true}
        ]
    }
];

// input score obj for player push to highscore array

function saveScore(){
// set local storage
}

function displayHighscores() {
// append highscores to page
}

function clearFeedback() {
    document.getElementById('feedback').remove
};

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
};

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function displayFeedback(correct){
    let feedbackP = feedbackContainerEl.firstChild
    if (correct) {
        feedbackP.textContent =  "Correct"
        document.getElementById('feedback-container').classList.remove('hide')
        highscore.score += 10
        // time is score
    } else {
        feedbackP.textContent =  "Incorrect"
        document.getElementById('feedback-container').classList.remove('hide')
        // take time away
    }
};

function answerClicked(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    if (answered === false) {
        answered = true
        displayFeedback(correct)
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        //hide everything, ask for initials to store, display highscores
        //need save/load functions
        console.log(highscore)
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    };
};

function showQuestion(question){
    questionEl.innerText = question.question;

    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', answerClicked)
        answerButtonsEl.appendChild(button)
    });
};

function startGame(){
    answered = false;
    startButton.classList.add('hide');
    feedbackContainerEl.classList.add('hide')
    shuffledQuestions= questions.sort(() => Math.random - .5); //make random work
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
    clearFeedback()
};

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    answered = false;
    feedbackContainerEl.classList.add('hide')
    currentQuestionIndex++
    setNextQuestion()
});