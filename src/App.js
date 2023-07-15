import React, { useState, useEffect } from "react";
import "./styles.css";

const AlphabetGame = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [randomLetter, setRandomLetter] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [availableLetters, setAvailableLetters] = useState(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);

    if (letter === randomLetter) {
      setCorrectCount(correctCount + 1);
      const updatedLetters = availableLetters.replace(letter, "");
      setAvailableLetters(updatedLetters);
    } else {
      setAttempts(attempts + 1);
      setSelectedLetter(null);
    }
  };

  useEffect(() => {
    const getRandomLetter = () => {
      if (availableLetters.length === 0 || attempts === 3) {
        // All letters have been guessed correctly or user exceeded attempts
        setRandomLetter(null);
      } else {
        const randomIndex = Math.floor(Math.random() * availableLetters.length);
        return availableLetters[randomIndex];
      }
    };

    const randomLetter = getRandomLetter();
    setRandomLetter(randomLetter);
    setSelectedLetter(null);
  }, [correctCount, attempts]);

  return (
    <div>
      <h1>Guess the Letter</h1>
      <div className="image-container">
        {randomLetter ? (
          <img
            src={`images/${randomLetter}.jpg`}
            alt={`Image of ${randomLetter}`}
            style={{ width: "200px", height: "100px" }}
          />
        ) : (
          <p>
            {attempts === 3
              ? "Attempts exceeded!"
              : "All letters guessed correctly!"}
          </p>
        )}
      </div>
      <div className="button-container">
        {selectedLetter && (
          <p>
            You selected: <strong>{selectedLetter}</strong>
          </p>
        )}
        {selectedLetter === randomLetter && randomLetter && (
          <p className="correct">Correct!</p>
        )}
        {selectedLetter && selectedLetter !== randomLetter && (
          <p className="attempts">Try again!</p>
        )}
        <p>Which letter does the image start with?</p>
        <p>
          Attempts: <strong>{attempts}</strong> / 3
        </p>
        <div className="letter-buttons">
          {availableLetters.split("").map((letter, index) => (
            <button
              key={index}
              onClick={() => handleLetterClick(letter)}
              className={
                selectedLetter === letter
                  ? selectedLetter === randomLetter
                    ? "correct"
                    : "incorrect"
                  : ""
              }
              disabled={selectedLetter !== null || attempts === 3}
              style={{ fontSize: "24px" }}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlphabetGame;
