const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons');

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

function clearFeedback(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
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

function displayFeedback(element, correct){
    let feedbackP = document.createElement('p')
    feedbackP.className = "feedback"
    feedbackP.id = "feedback"
    clearFeedback(element)
    if (correct) {
        feedbackP.textContent =  "Correct"
        questionContainerEl.appendChild(feedbackP)
    } else {
        feedbackP.textContent =  "Incorrect"
        questionContainerEl.appendChild(feedbackP)
    }
};

function answerClicked(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    displayFeedback(selectedButton, correct)

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
    console.log('started')
    startButton.classList.add('hide');
    shuffledQuestions= questions.sort(() => Math.random - .5); //make random work
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
};

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    document.getElementById('feedback').remove()
    currentQuestionIndex++
    setNextQuestion()
});