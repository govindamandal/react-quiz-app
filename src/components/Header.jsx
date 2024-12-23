import logoImg from '../assets/quiz-logo.jpeg'
function Header() {
  return (
    <header>
        <img src={logoImg} alt="Quiz App" />
        <h1>React Quiz</h1>
    </header>
  )
}

export default Header