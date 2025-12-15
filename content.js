// content.js

// Funkcja ładowania danych z answers.json
function loadAnswers() {
  return fetch(chrome.runtime.getURL('answers.json'))
    .then(response => response.json())
    .catch(error => {
      console.error("Error loading answers:", error);
      return [];
    });
}

// Funkcja zaznaczania odpowiedzi na stronie
function highlightCorrectAnswers(answersData) {
  const questions = document.querySelectorAll('.question'); // Zmodyfikuj selektor w zależności od strony
  
  questions.forEach(question => {
    const questionText = question.textContent.trim();
    
    const correctAnswer = answersData.find(item => item.question === questionText)?.answer;

    if (correctAnswer) {
      const answers = question.querySelectorAll('.answer'); // Zmodyfikuj selektor w zależności od strony

      answers.forEach(answer => {
        if (answer.textContent.trim() === correctAnswer) {
          answer.style.backgroundColor = 'red'; // Zmieniamy tło na czerwone dla poprawnej odpowiedzi
        }
      });
    }
  });
}

// Główna logika rozszerzenia
loadAnswers().then(answersData => {
  if (answersData.length > 0) {
    highlightCorrectAnswers(answersData);
  }
});
