import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../data/questions.js";
import quizCompleImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const shuffledAnswers = useRef();
  const currentQuestionIndex =
    answerState === "" ? answers.length : answers.length - 1;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[currentQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [currentQuestionIndex]
  );

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

  console.log("currentQuestionIndex: ", currentQuestionIndex);

  if (!shuffledAnswers.current) {
      shuffledAnswers.current = [...QUESTIONS[currentQuestionIndex].answers]
      shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }


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
          {shuffledAnswers.current.map((answer, index) => {
            const isSelected = answers[currentQuestionIndex - 1] === answer;
            let cssClass = "";
            
            if (isSelected && answerState === "answered") {
              cssClass = "selected";
            }

            if (answerState === "correct" || answer === 'wrong') {
              cssClass = answerState;
            }

            return (
              <li key={index} className="answer">
                <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Quiz;
