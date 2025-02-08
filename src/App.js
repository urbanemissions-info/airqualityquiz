import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; // Import necessary components

// Helper function to convert CSV to questions (shared by both quizzes)
function csvToQuestions(csvString) {
  const lines = csvString.trim().split("\n");
  const headers = lines[0].split(",");
  const questions = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const questionId = parseInt(values[0], 10);
    const questionText = values[1];
    const obj = { a: 2, b: 3, c: 4, d: 5 };
    const correctAnswerIndex = obj[values[6].replace("\r", "")]; // Assuming 'correct_ans' is at index 6

    const options = [];
    for (let j = 2; j <= 5; j++) {
      options.push({
        id: j - 2,
        text: values[j],
        isCorrect: j === correctAnswerIndex,
      });
    }

    questions.push({
      id: questionId,
      text: questionText,
      options: options,
    });
  }

  // Shuffle the questions array once (using Fisher-Yates algorithm)
  for (let i = questions.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions.slice(0,10);
}

// Quiz Component (reusable)
function Quiz({ googleSheetURL, quizTitle }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  // const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    loadQuestions();
  }, [googleSheetURL]); // Add googleSheetURL as a dependency

  const loadQuestions = () => {
    // setLoading(true); // Set loading to true before fetching
    fetch(googleSheetURL, {
      headers: { "content-type": "text/csv;charset=UTF-8" },
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvData) => {
        const data = csvToQuestions(csvData);
        setQuestions(data);
        // setLoading(false); // Set loading to false after successful fetch
      })
      .catch((error) => {
        console.error("Error fetching CSV file:", error);
        // setLoading(false); // Set loading to false even if there's an error
      });
  };

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    loadQuestions(); // Reload questions to shuffle
  };

  return (
    <div className="quiz-container"> {/* Add a class for styling */}
      <h1>{quizTitle}</h1> {/* Display the quiz title */}
      {questions.length === 0 ? (
        <h2>Loading quiz...</h2>
      ) : (
        <>
          <h2>Score: {score}</h2>
          {showResults ? (
            <div className="final-results">
              <h1>Final Results</h1>
              <h2>
                {score} out of {questions.length} correct - (
                {(score / questions.length) * 100}%)
              </h2>
              <button onClick={() => restartGame()}>Restart game</button>
            </div>
          ) : (
            <div className="question-card">
              <h2>
                Question: {currentQuestion + 1} out of {questions.length}
              </h2>
              <h3 className="question-text">{questions[currentQuestion]?.text}</h3>
              <ul>
                {questions[currentQuestion]?.options.map((option) => (
                  <li key={option.id} onClick={() => optionClicked(option.isCorrect)}>
                    {option.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}


function App() {
  const GOOGLE_SHEET_CSV_URL_1 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSzzNg3HDQK3vUKpEnIwOREwa-SeRIcfYoECkL1qwivnChSUy5xrI7vE8Gpipuo_TxX6YDerL97rfGG/pub?gid=0&single=true&output=csv"; // URL for Quiz 1
  const GOOGLE_SHEET_CSV_URL_2 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSzzNg3HDQK3vUKpEnIwOREwa-SeRIcfYoECkL1qwivnChSUy5xrI7vE8Gpipuo_TxX6YDerL97rfGG/pub?gid=329704009&single=true&output=csv"; // URL for Quiz 2

  return (
    <Router basename="/airqualityquiz">
      <div className="App">
        <Routes>
        <Route path="/" element={
            <div>
              <h1>Air Quality Quizzes</h1>
              <Link to="/basic">Air Quality Basic Quiz</Link> <br /> {/* Link to Basic Quiz */}
              <Link to="/advanced">Air Quality Advanced Quiz</Link> {/* Link to Advanced Quiz */}
            </div>
          } />
          <Route path="/basic" element={<Quiz googleSheetURL={GOOGLE_SHEET_CSV_URL_2} quizTitle="Air Quality Basic Quiz" />} />
          <Route path="/advanced" element={<Quiz googleSheetURL={GOOGLE_SHEET_CSV_URL_1} quizTitle="Air Quality Advanced Quiz" />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );

}

export default App;