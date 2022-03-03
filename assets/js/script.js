const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons');
const feedbackContainerEl = document.getElementById('feedback-container');
const feedbackPEl = document.getElementById('feedback-p')
const startMessageEl = document.getElementById('start-message');
const quizContentContainerEl = document.getElementById('quiz-content-container');
const highscoresEl = document.getElementById('highscores');
const initialFormEl = document.getElementById('log-initials');

let answered = false;

let shuffledQuestions, currentQuestionIndex;

const userData = []

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
    userData
    localStorage.setItem(JSON.stringify(userData))
    //
}

function displayInitialForm() {

}

function displayHighscores() {
// append highscores to page
    questionContainerEl.classList.add('hide');
    feedbackContainerEl.classList.add('hide');
    let highscore = JSON.parse(localStorage.getItem("highscores")) || [];
    //loop through data append data to page
    
}

function enterInitialsMenu() {

}

// --------------- END GAME HANDLERS --------------- //
function endGameHandler(){
        // hide everything, ask for initials to store name and score, 
        quizContentContainerEl.classList.add('hide')
        displayInitialForm()
        // update highscoreEl with highscore data
        // display highscores
        highscoresEl.classList.remove('hide')
        //--> need save/load functions
}
// =============== END OF END GAME HANDLERS =============== //

//template
// ---------------  --------------- //
// ===============  =============== //

// --------------- ANSWER CLICKED HANDLERS --------------- //
// evaluates whether correct or incorrect and executes corresponding actions
function displayFeedback(correct){
    if (correct) {
        // sets feedback text to correct
        feedbackPEl.textContent =  "Correct"
        // reveal the feedback section
        feedbackContainerEl.classList.remove('hide')
        // add time
        time += 5
    } else {
        // sets feedback text to incorrect
        feedbackPEl.textContent =  "Incorrect"
        // reveals the feedback section
        feedbackContainerEl.classList.remove('hide')
        // reduce time
        time -= 5
    }
};

// 5: answer clicked handler: determines whether user has already answered
// if not then feedback is displayed and func. determines if there 
// are more questions to be answered or if this call was the last question
function answerClicked(event) {
    // store button object from event.target
    const selectedButton = event.target;
    // store data-correct value to determine 
    // if button is correct or incorrect answer
    const correct = selectedButton.dataset.correct;
    // if not yet answered then evaluate
    if (answered === false) {
        // question is now answered
        answered = true
        // evaluate if answere was correct or incorrect
        displayFeedback(correct)
    }

    // if the next question index is a valid location in shuffledQuestions
    // then reveal the nextButton
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } 
    // else the last question was answered
    else {
        endGameHandler()
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    };
};
// =============== END OF ANSWER CLICKED HANDLERS =============== //

// --------------- DISPLAY QUESTION AND ANSWERS SECTION --------------- //
// 4: displays the question and answers from the question argument: an object
function showQuestion(question){
    // populates the question container with the question
    questionEl.innerText = question.question;

    // loops through the array of answers and for each creates a button
    question.answers.forEach(answer => {
        // create button
        const button = document.createElement('button')
        // button text is answer
        button.innerText = answer.text
        // style the button
        button.classList.add('btn')
        // if the answer has a correct attribute then
        // attribute that data to the button
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        // add click event listener to each button, when clicked fires answerClicked
        button.addEventListener('click', answerClicked)
        // appends button to button container
        answerButtonsEl.appendChild(button)
    });
};
// =============== END OF DISPLAY QUESTION AND ANSWERS SECTION =============== //

// --------------- NEXT QUESTION INITALIZATION --------------- //
// removes elements from page so new question elements can take their place
function resetState() {
    // hides the next button
    nextButton.classList.add('hide');
    // while the button container has a first child remove that child
    // this empties the button container
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
};

// 3: handles initalizing next question
function setNextQuestion() {
    // removes current items from page
    resetState()
    // passes the current index of the object containing question/answer data
    // to the show question function which displays that data on the page
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};
// =============== END OF NEXT QUESTION INITALIZATION =============== //

// --------------- START-GAME SECTION --------------- //
const startingMinute = 1;
let time = startingMinute * 30;
const timerEl = document.getElementById('timer');

// decrements time by 1 second
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

// 2: Initialized a new game
function startGame(){
    //sets defaults; question is not answered
    answered = false;

    // every second countdown function is called
    setInterval(countdown, 1000);

    // hides start-button, answer-feedback, and the starting-message
    startButton.classList.add('hide');
    feedbackContainerEl.classList.add('hide')
    startMessageEl.classList.add('hide')

    // shuffles the questions 
    shuffledQuestions = questions.sort(() => Math.random - .5); //make random work
    // starts at the beginning of questions array
    currentQuestionIndex = 0;
    // reveals question container element
    questionContainerEl.classList.remove('hide');

    // reveals question according to index
    setNextQuestion();
};
// =============== END OF START GAME SECTION =============== //

// --------------- EVENT LISTENERS SECTION --------------- //
// 1: fire startGame function when start button is clicked
startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    answered = false;
    feedbackContainerEl.classList.add('hide')
    currentQuestionIndex++
    setNextQuestion()
});
// =============== END OF EVENT LISTENERS SECTION =============== //