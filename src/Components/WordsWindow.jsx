import React from 'react'
import { useGameContext } from '../Contexts/GameContext'
import { LoadingIcon } from '../Components'


function WordsWindow() {
  const {Game, WordsDisplay, Progress} = useGameContext();

  return <div className='relative flex-grow select-none w-full h-full'>
        {
          WordsDisplay.map((element, i0) => {
            return <div key={"BigArr"+i0} className='absolute transition-all duration-500 w-full' style={element.style}>
              
              <div key={"SmallBigArr"+i0} className='flex flex-row justify-evenly gap-x-5 w-full text-2xl font-bold origin-center'>
                {
                  element.words.map((word, i1) => {
                    return typeof(word) == typeof("") ? <div key={"Arr1"+i1}>{word}</div>
                    :
                    <div key={"Arr2"+i1}>
                      {
                        word.map((w,i2) => {
                          return (
                            <span
                              key={"SmallSpan" + i1 + i2}
                              style={{
                                color: w.correct === true ? 'limegreen' : w.correct === false ? 'crimson' : 'white',
                                textShadow: w.correct === true ? '0 0 5px rgba(0, 255, 0, 0.7)' : w.correct === false ? '0 0 5px rgba(255, 0, 0, 0.7)': '0 0 5px rgba(0, 255, 255, 0.7)', // Glow effect
                                borderBottom: w.correct === true ? '2px solid limegreen' :  w.correct === false ? '2px solid crimson': '', // Underline with color // Bottom shadow effectect
                              }}
                            >
                              {w.char}
                            </span>
                          );                      
                        })
                      }
                    </div>
                  })
                }
              </div>
            </div>
          })
        }
      </div>
}

export default WordsWindow