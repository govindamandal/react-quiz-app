import { useState } from "react";
import QUESTIONS from "../data/questions.js";

function Quiz() {
    const [answers, setAnswers] = useState([]);
    const currentQuestionIndex = answers.length;
    function handleSelectAnswer(selectedAnswer) {
        setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    }
  return <div id="quiz">
    <div id="question">
    <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
    <ul id="answers">
      {QUESTIONS[currentQuestionIndex].answers.map((answer, index) => (
        <li key={index} className="answer">
          <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
        </li>
      ))}
    </ul>
  </div>
  </div>;
}

export default Quiz;
