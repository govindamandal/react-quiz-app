import { useCallback, useState } from "react";
import QUESTIONS from "../data/questions.js";
import quizCompleImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

function Quiz() {
  const [answers, setAnswers] = useState([]);
  const currentQuestionIndex = answers.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  },
  []);

  const quizComplete = answers.length === QUESTIONS.length;

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizComplete) {
    return (
      <div id="summary">
        <div id="results">
          <img src={quizCompleImg} alt="Quiz complete" />
          <h2>Quiz complete!</h2>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                <strong>{QUESTIONS[index].text}</strong> - {answer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const shuffledAnswers = QUESTIONS[currentQuestionIndex].answers.sort(
    () => Math.random() - 0.5
  );

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={currentQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer, index) => (
            <li key={index} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Quiz;
