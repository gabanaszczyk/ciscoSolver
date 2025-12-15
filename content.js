// content.js
fetch(chrome.runtime.getURL('answers.json'))
  .then(response => response.json())
  .then(data => {
    // Załaduj dane o poprawnych odpowiedziach z answers.json
    const correctAnswers = data;

    // Funkcja do porównywania tekstu pytania
    function findAnswerForQuestion(questionText) {
      // Przeszukaj dane i znajdź odpowiedź dla danego pytania
      const answer = correctAnswers.find(item => item.question === questionText);
      return answer ? answer.answer : null;
    }

    // Przeszukaj stronę w poszukiwaniu pytań i odpowiedzi
    const questionElements = document.querySelectorAll('.question-text');  // Zmienna zależna od struktury strony
    questionElements.forEach(questionElement => {
      const questionText = questionElement.textContent.trim();  // Pobieramy tekst pytania
      
      // Znajdź odpowiedź dla pytania
      const correctAnswer = findAnswerForQuestion(questionText);
      
      if (correctAnswer) {
        // Znajdź odpowiednią odpowiedź na stronie (np. na podstawie tekstu odpowiedzi)
        const answerElements = questionElement.parentElement.querySelectorAll('.answer');  // Zakładam, że odpowiedzi są w tym samym rodzicu
        answerElements.forEach(answerElement => {
          if (answerElement.textContent.trim() === correctAnswer) {
            answerElement.style.backgroundColor = 'red';  // Podświetl poprawną odpowiedź
            answerElement.style.color = 'white';         // Ustaw kolor tekstu na biały
          }
        });
      }
    });
  })
  .catch(error => console.error('Błąd ładowania odpowiedzi:', error));
