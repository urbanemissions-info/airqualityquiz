import React, { useEffect, useState } from "react";
import "./App.css";
import csv from "./quiz.csv";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

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

    return questions;
  }

  // Example CSV input (as a string)
  // const csvData = `question_id,text,option_0,option_1,option_2,option_3,correct_ans
  // 1,What is Particulate Matter (PM) 2.5?,All PM with radius less than 2.5 µm,All PM with radius less than 2.5 mm,All PM with diameter less than 2.5 µm,All PM with diameter less than 2.5 mm,2
  // 2,Which gas is responsible for acid rain?,Ozone (O3),Carbon Dioxide (CO2),Carbon Monoxide (CO),Sulphur Dioxide (SO2),3`;
  // Read the CSV file

  useEffect(() => {
    loadquotesCSV();
  }, []);

  const [questions, setQuestions] = useState([]);
  const [questionsWithRandomIds, setQuestionsWithRandomIds] = useState(questions);

  const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSzzNg3HDQK3vUKpEnIwOREwa-SeRIcfYoECkL1qwivnChSUy5xrI7vE8Gpipuo_TxX6YDerL97rfGG/pub?gid=0&single=true&output=csv";
  function loadquotesCSV() {
    fetch(GOOGLE_SHEET_CSV_URL, {
      headers: { "content-type": "text/csv;charset=UTF-8" },
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // console.log("CSV Data:", response.text());
        return response.text();
      })
      .then((csvData) => {
        // console.log("CSV Data:", csvData);
        const data = csvToQuestions(csvData);
        setQuestions(data);
        setQuestionsWithRandomIds(data);
        // You can now process the CSV data as needed
      })
      .catch((error) => {
        console.error("Error fetching CSV file:", error);
      });
  }

  // Helper Functions
  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questionsWithRandomIds.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    // Shuffle the questions array once (using Fisher-Yates algorithm)
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    setQuestionsWithRandomIds(questions);
  };

  // if (begin_shuffle) {
  //   restartGame();
  //   setBeginShuffle(false);
  // }

  return (
    <div className="App">
      {/* 1. Header */}
      <h1>Air Quality Quiz</h1>
  
      {/* Show loading message if questions are not yet loaded */}
      {questions.length === 0 ? (
        <h2>Loading quiz...</h2>
      ) : (
        <>
          {/* 2. Current Score */}
          <h2>Score: {score}</h2>
  
          {/* 3. Show results or show the question game */}
          {showResults ? (
            /* 4. Final Results */
            <div className="final-results">
              <h1>Final Results</h1>
              <h2>
                {score} out of {questionsWithRandomIds.length} correct - (
                {(score / questionsWithRandomIds.length) * 100}%)
              </h2>
              <button onClick={() => restartGame()}>Restart game</button>
            </div>
          ) : (
            /* 5. Question Card */
            <div className="question-card">
              <h2>
                Question: {currentQuestion + 1} out of {questionsWithRandomIds.length}
              </h2>
              <h3 className="question-text">{questionsWithRandomIds[currentQuestion]?.text}</h3>
  
              <ul>
                {questionsWithRandomIds[currentQuestion]?.options.map((option) => (
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

export default App;
