import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onTimeout])
  useEffect(() => {
    const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 100);
      }, 100);
    return () => clearInterval(interval);
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime}/>;
}
QuestionTimer.propTypes = {
  timeout: PropTypes.number.isRequired,
  onTimeout: PropTypes.func.isRequired,
};

export default QuestionTimer;
