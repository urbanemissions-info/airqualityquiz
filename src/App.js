import React, { useState } from "react";
import "./App.css";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      text: "What is Particulate Matter (PM) 2.5?",
      options: [
        { id: 0, text: "All PM with radius less than 2.5 µm", isCorrect: false },
        { id: 1, text: "All PM with radius less than 2.5 mm", isCorrect: false },
        { id: 2, text: "All PM with diameter less than 2.5 µm", isCorrect: true },
        { id: 3, text: "All PM with diameter less than 2.5 mm", isCorrect: false },
      ],
    },

    {
      text: "What is the main ingredient of the acid rain?",
      options: [
        { id: 0, text: "Nitrogen dioxide (NO2)", isCorrect: false },
        { id: 1, text: "Sulphuric acid (H2SO4)", isCorrect: false },
        { id: 2, text: "Carbon Monoxide (CO)", isCorrect: false },
        { id: 3, text: "Sulphur dioxide (SO2)", isCorrect: true },
      ],
    },

    {
      text: "Which of the following is not a necessary ingredient in the production of Tropospheric Ozone?",
      options: [
        { id: 0, text: "Nitrogen Oxides (NOx)", isCorrect: false },
        { id: 1, text: "Carbon dioxide (CO2)", isCorrect: true },
        { id: 2, text: "Volatile Organic Compounds (VOCs)", isCorrect: false },
        { id: 3, text: "Sunlight", isCorrect: false },
      ],
    },

    {
      text: "Which of the following pollutants can exist in both gas and aerosol phases?",
      options: [
        { id: 0, text: "Particulate Matter (PM 2.5)", isCorrect: false },
        { id: 1, text: "Sulphur Dioxide (SO2)", isCorrect: true },
        { id: 2, text: "Ozone (O3)", isCorrect: false },
        { id: 3, text: "Carbon Monoxide (CO)", isCorrect: false },
      ],
    },

    {
      text: "What is the unit of Air Quality Index (AQI) ?",
      options: [
        { id: 0, text: "Parts per million (ppm)", isCorrect: false },
        { id: 1, text: "Micrograms (µg)", isCorrect: false },
        { id: 2, text: "Micrograms per unit volumen (µg/m3)", isCorrect: false },
        { id: 3, text: "None", isCorrect: true },
      ],
    },

    {
      text: "What AQI value is considered 'Good' in India?",
      options: [
        { id: 0, text: "0-10", isCorrect: false },
        { id: 1, text: "50-100", isCorrect: false },
        { id: 2, text: "0-25", isCorrect: false },
        { id: 3, text: "0-50", isCorrect: true },
      ],
    },

    {
      text: "What is the fundamental equation in building an Emissions Inventory?",
      options: [
        { id: 0, text: "Activity * Emissions Factor", isCorrect: true },
        { id: 1, text: "Activity / Emissions Factor", isCorrect: false },
        { id: 2, text: "Emissions Factor / Activity", isCorrect: false },
        { id: 3, text: "Activity + Emissions Factor", isCorrect: false },
      ],
    },
    
    {
      text: "What is the representative area of an air quality monitor?",
      options: [
        { id: 0, text: "10 sq.km", isCorrect: false },
        { id: 1, text: "4 sq.km", isCorrect: true },
        { id: 2, text: "2 sq.km", isCorrect: false },
        { id: 3, text: "20 sq.km", isCorrect: false },
      ],
    },

    {
      text: "What does source apportionment study aim to determine?",
      options: [
        { id: 0, text: "When the pollution occurred", isCorrect: false },
        { id: 1, text: "The geographical location of pollution", isCorrect: false },
        { id: 2, text: "What all activities contributed to the air pollution", isCorrect: true },
        { id: 3, text: "The composition of pollutants", isCorrect: false },
      ],
    },

    {
      text: "What action is recommended when idling in traffic for more than 30 seconds??",
      options: [
        { id: 0, text: "Keep the engine running to avoid restart, which causes more pollution.", isCorrect: false },
        { id: 1, text: "Reduce air conditioning", isCorrect: false },
        { id: 2, text: "Turn off the engine", isCorrect: true },
        { id: 3, text: "Put the vehicle on a Neutral gear", isCorrect: false },
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
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
  };

  return (
    <div className="App">
      {/* 1. Header  */}
      <h1>Air Quality Quiz</h1>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
