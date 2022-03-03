const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons');
const feedbackContainerEl = document.getElementById('feedback-container');
const startMessageEl = document.getElementById('start-message');
let answered = false;
let shuffledQuestions, currentQuestionIndex;

const startingMinute = 1;
let time = startingMinute * 30;
const timerEl = document.getElementById('timer');

function countdown() {
    if (time >= 0) {
        const minutes = Math.floor(time/60);
        let seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerEl.innerHTML = `${minutes}:${seconds}`;
        time--
    } else {
        time = 0
        saveScore(time)
        displayHighscores()
    }
};

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

function saveScore(time){
// set local storage
    //let highscore = JSON.parse(localStorage.getItem("highscores")) || [];
}

function displayHighscores() {
// append highscores to page
    questionContainerEl.classList.add('hide');
    feedbackContainerEl.classList.add('hide');
    
}

function enterInitialsMenu() {

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
        time += 5
        // time is score
    } else {
        feedbackP.textContent =  "Incorrect"
        document.getElementById('feedback-container').classList.remove('hide')
        time -= 5
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
    debugger;
    answered = false;

    setInterval(countdown, 1000);
    startButton.classList.add('hide');
    feedbackContainerEl.classList.add('hide')
    startMessageEl.classList.add('hide')

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