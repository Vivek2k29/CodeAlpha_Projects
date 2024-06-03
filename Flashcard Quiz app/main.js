document.getElementById('addFlashcard').addEventListener('click', addFlashcard);
document.getElementById('startQuiz').addEventListener('click', startQuiz);
document.getElementById('submitAnswer').addEventListener('click', submitAnswer);
document.getElementById('retryQuiz').addEventListener('click', retryQuiz);

let flashcards = [];
let currentFlashcardIndex = 0;
let score = 0;

function addFlashcard() {
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;

    if (question && answer) {
        flashcards.push({ question, answer });
        displayFlashcards();
        document.getElementById('question').value = '';
        document.getElementById('answer').value = '';
    }
}

function displayFlashcards() {
    const flashcardContainer = document.getElementById('flashcards');
    flashcardContainer.innerHTML = '';
    flashcards.forEach((flashcard, index) => {
        const flashcardElement = document.createElement('div');
        flashcardElement.classList.add('flashcard');
        flashcardElement.innerText = `Q: ${flashcard.question} \nA: ${flashcard.answer}`;
        flashcardContainer.appendChild(flashcardElement);
    });
}

function startQuiz() {
    if (flashcards.length > 0) {
        currentFlashcardIndex = 0;
        score = 0;
        document.getElementById('quizContainer').classList.remove('hidden');
        document.getElementById('scoreContainer').classList.add('hidden');
        document.getElementById('startQuiz').classList.add('hidden');
        document.getElementById('flashcards').classList.add('hidden');
        displayQuestion();
    } else {
        alert("Please add at least one flashcard before starting the quiz.");
    }
}

function displayQuestion() {
    const flashcard = flashcards[currentFlashcardIndex];
    document.getElementById('questionDisplay').innerText = flashcard.question;
    document.getElementById('userAnswer').value = '';
}

function submitAnswer() {
    const userAnswer = document.getElementById('userAnswer').value;
    const correctAnswer = flashcards[currentFlashcardIndex].answer;

    if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
        score++;
    }

    currentFlashcardIndex++;
    if (currentFlashcardIndex < flashcards.length) {
        displayQuestion();
    } else {
        displayScore();
    }
}

function displayScore() {
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('scoreContainer').classList.remove('hidden');
    document.getElementById('startQuiz').classList.remove('hidden');
    document.getElementById('flashcards').classList.remove('hidden');
    document.getElementById('score').innerText = `${score} out of ${flashcards.length}`;
}

function retryQuiz() {
    startQuiz();
}

// Start the quiz when the page loads if there are flashcards
window.onload = function() {
    if (flashcards.length > 0) {
        startQuiz();
    }
};
