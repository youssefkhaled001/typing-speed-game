import React, { useEffect, useState } from 'react';

function BeforeGame() {
  const Text = "Typing Speed Game...";
  const [current, setCurrent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingForward, setIsTypingForward] = useState(true);
  const [randomCharacter, setRandomCharacter] = useState("");

  const getRandomChar = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=[]{}|;':\",.<>/? ";
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  useEffect(() => {
    const tid = setInterval(() => {
      if (isTypingForward) {
        setCurrentIndex(prevIndex => {
          if (Math.random() < 0.1) { // Randomly insert a wrong character
            setRandomCharacter(getRandomChar());
            setCurrent(prevText => prevText + randomCharacter);
          } else {
            const nextChar = prevIndex < Text.length ? Text[prevIndex] : "";
            setCurrent(prevText => prevText + nextChar);
          }
          if (prevIndex+1 > Text.length) {
            setIsTypingForward(false);
          }
          return prevIndex+1;
        });
      } else {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex - 1;
          setCurrent(prevText => prevText.substring(0, nextIndex));
          if (nextIndex === 0) {
            setIsTypingForward(true);
            setRandomCharacter(""); // Clear the random character when backspacing
          }
          return nextIndex;
        });
      }
    }, 100);

    return () => {
      clearInterval(tid);
    };
  }, [isTypingForward, randomCharacter]);

  return (
    <div className="relative">
      <div className="cursor-blink absolute -right-1 top-0 h-full bg-white w-1 animate-blink rounded-md"></div>
      <div className="relative z-10 text-4xl font-bold">{current}</div>
    </div>
  );
}

export default BeforeGame;
