var startButtonEl = document.querySelector("button[value='start']");
var questionSectionEl = document.getElementById("question");
var score = 0;
var questions = [
    {
        question: "Which of the following is a primitive DataType",
        answers: ["array", "function", "integers", "object"],
        correctIndex: 2
    }
];


function runQuiz() {
    startButtonEl.value, startButtonEl.innerHTML = "submit"
    // loop through questions array, display question 
    // until an answer is clicked, if right then score++
    for (var i = 0; i < questions.length; i++){
        questionSectionEl.innerHTML = questions[i].question;
        // loop length of answers displaying each
        // click event for each, data-id for 
    };
};

// start button on click populates 
// question div with first question and answer choices
startButtonEl.addEventListener("click", runQuiz);