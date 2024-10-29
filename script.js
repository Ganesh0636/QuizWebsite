let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let answerChecked = false;

const quizContainer = document.getElementById("quiz");
const checkButton = document.getElementById("check-button");
const nextButton = document.getElementById("next-button");
const resultDisplay = document.getElementById("result");

// Load questions from JSON file
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    quizData = data;
    loadQuestion();
  })
  .catch((error) => console.error("Error loading questions:", error));

function loadQuestion() {
  answerChecked = false; // Reset for new question
  const currentQuestion = quizData[currentQuestionIndex];
  quizContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <label><input type="radio" name="answer" value="a"> ${currentQuestion.a}</label><br>
        <label><input type="radio" name="answer" value="b"> ${currentQuestion.b}</label><br>
        <label><input type="radio" name="answer" value="c"> ${currentQuestion.c}</label><br>
        <label><input type="radio" name="answer" value="d"> ${currentQuestion.d}</label>
    `;
  nextButton.style.display = "none"; // Hide the Next button initially
}

function getSelectedAnswer() {
  const answers = document.querySelectorAll('input[name="answer"]');
  for (const answer of answers) {
    if (answer.checked) {
      return answer.value;
    }
  }
  return null;
}

function highlightAnswers(selectedAnswer) {
  const labels = quizContainer.querySelectorAll("label");
  labels.forEach((label) => {
    const input = label.querySelector("input");
    if (input.value === quizData[currentQuestionIndex].correct) {
      label.classList.add("correct");
    } else if (input.value === selectedAnswer) {
      label.classList.add("incorrect");
    }
  });
}

checkButton.addEventListener("click", () => {
  if (answerChecked) return; // Prevent checking the answer again

  const selectedAnswer = getSelectedAnswer();
  if (selectedAnswer) {
    highlightAnswers(selectedAnswer);
    answerChecked = true;

    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
      score++;
    }

    nextButton.style.display = "block"; // Show the Next button
  } else {
    alert("Please select an answer!");
  }
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    resultDisplay.innerHTML = `You scored ${score} out of ${quizData.length}`;
    quizContainer.style.display = "none";
    checkButton.style.display = "none"; // Hide the Check Answer button
    nextButton.style.display = "none"; // Hide the Next button
  }
});
