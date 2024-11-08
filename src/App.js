import React, { useState } from "react";
import "./App.css";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [begin_shuffle, setBeginShuffle] = useState(true);

  const questions = [
    {
      id: 1,
      text: "What is Particulate Matter (PM) 2.5?",
      options: [
        { id: 0, text: "All PM with radius less than 2.5 µm", isCorrect: false },
        { id: 1, text: "All PM with radius less than 2.5 mm", isCorrect: false },
        { id: 2, text: "All PM with diameter less than 2.5 µm", isCorrect: true },
        { id: 3, text: "All PM with diameter less than 2.5 mm", isCorrect: false },
      ],
    },

    {
      id: 2,
      text: "Which gas is responsible for acid rain?",
      options: [
        { id: 0, text: "Ozone (O3)", isCorrect: false },
        { id: 1, text: "Carbon Dioxide (CO2)", isCorrect: false },
        { id: 2, text: "Carbon Monoxide (CO)", isCorrect: false },
        { id: 3, text: "Sulphur Dioxide (SO2)", isCorrect: true },
      ],
    },

    {
      id: 3,
      text: "Which of the following is not a necessary ingredient in the production of 'Global' Tropospheric Ozone?",
      options: [
        { id: 0, text: "Nitrogen Oxides (NOx)", isCorrect: false },
        { id: 1, text: "Carbon dioxide (CO2)", isCorrect: true },
        { id: 2, text: "Volatile Organic Compounds (VOCs)", isCorrect: false },
        { id: 3, text: "Sunlight", isCorrect: false },
      ],
    },

    {
      id: 4,
      text: "Which of the following gaseous pollutants can directly contribute to aerosol concentrations?",
      options: [
        { id: 0, text: "Particulate Matter (PM 2.5)", isCorrect: false },
        { id: 1, text: "Sulphur Dioxide (SO2)", isCorrect: true },
        { id: 2, text: "Ozone (O3)", isCorrect: false },
        { id: 3, text: "Carbon Monoxide (CO)", isCorrect: false },
      ],
    },

    {
      id: 5,
      text: "What is the unit of Air Quality Index (AQI) ?",
      options: [
        { id: 0, text: "Parts per million (ppm)", isCorrect: false },
        { id: 1, text: "Micrograms (µg)", isCorrect: false },
        { id: 2, text: "Micrograms per unit volume (µg/m3)", isCorrect: false },
        { id: 3, text: "None", isCorrect: true },
      ],
    },

    {
      id: 6,
      text: "What is the fundamental equation in building an Emissions Inventory?",
      options: [
        { id: 0, text: "Activity * Emissions Factor", isCorrect: true },
        { id: 1, text: "Activity / Emissions Factor", isCorrect: false },
        { id: 2, text: "Emissions Factor / Activity", isCorrect: false },
        { id: 3, text: "Activity + Emissions Factor", isCorrect: false },
      ],
    },
    
    {
      id: 7,
      text: "What is the representative area of an air quality monitor?",
      options: [
        { id: 0, text: "Area with a radius of 1 km", isCorrect: false },
        { id: 1, text: "Area with a radius of 2 km", isCorrect: true },
        { id: 2, text: "Area with a radius of 4 km", isCorrect: false },
        { id: 3, text: "Area with a radius of 10 km", isCorrect: false },
      ],
    },

    {
      id: 8,
      text: "What does source apportionment study aim to determine?",
      options: [
        { id: 0, text: "When the pollution occurred", isCorrect: false },
        { id: 1, text: "The geographical location of pollution", isCorrect: false },
        { id: 2, text: "What all activities contributed to the air pollution", isCorrect: true },
        { id: 3, text: "The chemical composition of pollutants", isCorrect: false },
      ],
    },

    {
      id: 9,
      text: "What action is recommended when idling in traffic for more than 30 seconds?",
      options: [
        { id: 0, text: "Keep the engine running to avoid restart, which causes more pollution", isCorrect: false },
        { id: 1, text: "Reduce air conditioning", isCorrect: false },
        { id: 2, text: "Turn off the engine", isCorrect: true },
        { id: 3, text: "Put the vehicle on a Neutral gear", isCorrect: false },
      ],
    },

    {
      id: 10,
      text: "Main pollutant of volcanic eruptions is ?",
      options: [
        { id: 0, text: "Nitrogen Dioxide (NO2)", isCorrect: false },
        { id: 1, text: "Sulphur Dioxide (SO2)", isCorrect: true },
        { id: 2, text: "Ozone (O3)", isCorrect: false },
        { id: 3, text: "Volatile Organic Compounds (VOCs)", isCorrect: false },
      ],
    },

    {
      id: 11,
      text: "Pollutant that gets attached to blood (haemoglobin) and leads to premature mortality?",
      options: [
        { id: 0, text: "Nitrogen Dioxide (NO2)", isCorrect: false },
        { id: 1, text: "Benzene (C6H6)", isCorrect: false },
        { id: 2, text: "Ozone (O3)", isCorrect: false },
        { id: 3, text: "Carbon Monoxide (CO)", isCorrect: true },
      ],
    },

    {
      id: 12,
      text: "Lightning produces this in large quantities?",
      options: [
        { id: 0, text: "Nitrogen oxides (NOx)", isCorrect: true },
        { id: 1, text: "Halogen compounds", isCorrect: false },
        { id: 2, text: "Ozone (O3)", isCorrect: false },
        { id: 3, text: "Volatile Organic Compounds (VOCs)", isCorrect: false },
      ],
    },

    {
      id: 13,
      text: "Pollutant concentrations most used for calculating health impacts?",
      options: [
        { id: 0, text: "Sulphur Dioxide (SO2) and Nitrogen Dioxide (NO2)", isCorrect: false },
        { id: 1, text: "Particulate Matter 2.5 (PM2.5) and Ozone (O3)", isCorrect: true },
        { id: 2, text: "Nitrogen Dioxide (NO2) and Particulate Matter 2.5 (PM2.5)", isCorrect: false },
        { id: 3, text: "NO2, Benzene (C6H6) and Ozone (O3)", isCorrect: false },
      ],
    },

    {
      id: 14,
      text: "Good ozone protecting us from UV radiation resides in?",
      options: [
        { id: 0, text: "Troposphere", isCorrect: false },
        { id: 1, text: "Heliosphere", isCorrect: false },
        { id: 2, text: "Mesosphere", isCorrect: false },
        { id: 3, text: "Stratosphere", isCorrect: true },
      ],
    },

    {
      id: 15,
      text: "Chronic Obstructive Pulmonary Disorder (COPD) is associated with ?",
      options: [
        { id: 0, text: "Heart", isCorrect: false },
        { id: 1, text: "Lungs", isCorrect: true },
        { id: 2, text: "Eyes", isCorrect: false },
        { id: 3, text: "Veins", isCorrect: false },
      ],
    },

    {
      id: 16,
      text: "Ultrafine particulates are Particulate Matter (PM) less than?",
      options: [
        { id: 0, text: "10μm", isCorrect: false },
        { id: 1, text: "1μm", isCorrect: false },
        { id: 2, text: "0.1μm", isCorrect: true },
        { id: 3, text: "0.01μm", isCorrect: false },
      ],
    },

    {
      id: 17,
      text: "Ambient air pollution sources are?",
      options: [
        { id: 0, text: "Everything that burns", isCorrect: true },
        { id: 1, text: "mostly power plants", isCorrect: false },
        { id: 2, text: "mostly transport", isCorrect: false },
        { id: 3, text: "waste burning", isCorrect: false },
      ],
    },

    {
      id: 18,
      text: "Which of the following statements is TRUE",
      options: [
        { id: 0, text: "Air quality index provides more information than air quality data ", isCorrect: false },
        { id: 1, text: "Air quality index information is preferred for regulatory purposes", isCorrect: false },
        { id: 2, text: "Air quality index information is preferred for public awareness", isCorrect: true },
        { id: 3, text: "Air quality index value is same as PM2.5 concentration value", isCorrect: false },
      ],
    },

    {
      id: 19,
      text: "Which of the following statements is TRUE",
      options: [
        { id: 0, text: "Discussions on pollution is same as discussions on concentrations", isCorrect: true },
        { id: 1, text: "Discussions on emissions is same as discussions on pollution", isCorrect: false },
        { id: 2, text: "Discussions on emissions is same as discussions on air quality index", isCorrect: false },
        { id: 3, text: "Discussions on pollutants is same as discussions on air quality index", isCorrect: false },
      ],
    },

    {
      id: 20,
      text: "Which of the following statements is TRUE",
      options: [
        { id: 0, text: "Two monitoring stations is a good sample to represent a city", isCorrect: false },
        { id: 1, text: "Low-cost sensors are same as regulatory-grade monitoring systems", isCorrect: false },
        { id: 2, text: "Regulatory-grade systems do not require any maintenance", isCorrect: false },
        { id: 3, text: "All monitoring systems require regular maintenance and calibration", isCorrect: true },
      ],
    },

    {
      id: 21,
      text: "Which of the following statements is TRUE",
      options: [
        { id: 0, text: "Satellite observations can directly replace ground measurements", isCorrect: false },
        { id: 1, text: "Satellite observations are superior to ground measurements", isCorrect: false },
        { id: 2, text: "Satellite observations are a proxy to ground measurements", isCorrect: true },
        { id: 3, text: "Satellite observations are a proxy to emission inventories", isCorrect: false },
      ],
    },

    {
      id: 22,
      text: "What is TRUE about Aerosol Optical Depth (AOD)?",
      options: [
        { id: 0, text: "AOD is a proxy of PM2.5 or PM10 concentrations in the air", isCorrect: true },
        { id: 1, text: "AOD from satellites is same as PM2.5/PM10 from ground measurements", isCorrect: false },
        { id: 2, text: "AOD can be used for policy discussions globally", isCorrect: false },
        { id: 3, text: "AOD from a single satellite pass per day is enough to deduce pollution", isCorrect: false },
      ],
    },

    {
      id: 23,
      text: "Best way to reduce pollution",
      options: [
        { id: 0, text: "Increase the number of monitoring stations", isCorrect: false },
        { id: 1, text: "Control emissions at all the sources", isCorrect: true },
        { id: 2, text: "Use vacuum cleaners to suck pollution in the air", isCorrect: false },
        { id: 3, text: "All the above", isCorrect: false },
      ],
    },

    {
      id: 24,
      text: "Which of the following statements is TRUE about source apportionment techniques",
      options: [
        { id: 0, text: "Sampling-chemical-analysis approach is always preferred", isCorrect: false },
        { id: 1, text: "Sampling-chemical-analysis approach is the best", isCorrect: false },
        { id: 2, text: "Emissions-pollution-modelling approach is always preferred", isCorrect: false },
        { id: 3, text: "Emissions-pollution-modelling approach has better spatial and temporal coverage ", isCorrect: true },
      ],
    },

    
  ];

  
const [questionsWithRandomIds, setQuestionsWithRandomIds] = useState(questions);

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

  if (begin_shuffle) {
    restartGame();
    setBeginShuffle(false);

  }

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
            {score} out of {questionsWithRandomIds.length} correct - (
            {(score / questionsWithRandomIds.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        /* 5. Question Card  */
        
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questionsWithRandomIds.length}
          </h2>
          <h3 className="question-text">{questionsWithRandomIds[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questionsWithRandomIds[currentQuestion].options.map((option) => {
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
