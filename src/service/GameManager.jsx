import React, { useEffect } from 'react'
import { useWordsFetch, useTimer } from '../Hooks'
import { useGameContext } from '../Contexts/GameContext'

function GameManager() {

    useWordsFetch()

    const {time, operations}=useTimer()
    const {Game, setGame, Progress, setProgress, dispatchWordsDisplay, currentText} = useGameContext()
    
    useEffect(()=>{
      if(Game.status == 'Started')
        operations.Start();
    }, [Game.status])

    useEffect(()=>{
      setProgress({type: 'NEXT', words: Game.currentWords})
      dispatchWordsDisplay({currentWords: Game.currentWords, nextWords: Game.nextWords})
    }, [Game.currentWords])
  
    useEffect(()=>{
      dispatchWordsDisplay({currentWords: Progress.currentWordsProgress, nextWords: []})
    }, [Progress.currentWordsProgress])

    useEffect(()=>{
      if(time.minutes == 1)
      {
        setGame({type: "FINISH"})
        setProgress({type: "SCORE", correct: Game.currentWords, answer: currentText})
        dispatchWordsDisplay({});
        operations.Stop();
      }
    }, [time.minutes])
    
    return (
      <>
        <div className='absolute right-0 top-0 font-bold text-xl'>
          {time.minutes < 10 ? 0 : null }{time.minutes} : {time.seconds < 10 ? 0 : null }{time.seconds} : {time.miliSeconds/10 < 10 ? 0 : null }{time.miliSeconds/10}
        </div>
      </>
    )
}

export default GameManager