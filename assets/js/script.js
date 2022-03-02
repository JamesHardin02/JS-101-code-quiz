const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons');
const feedbackContainerEl = document.getElementById('feedback-container');

let shuffledQuestions, currentQuestionIndex;

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
        // feedbackContainerEl.appendChild(feedbackP)
        document.getElementById('feedback-container').classList.remove('hide')
    } else {
        feedbackP.textContent =  "Incorrect"
        // feedbackContainerEl.appendChild(feedbackP)
        document.getElementById('feedback-container').classList.remove('hide')
    }
};

function answerClicked(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    displayFeedback(correct)

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
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
    feedbackContainerEl.classList.add('hide')
    currentQuestionIndex++
    setNextQuestion()
});