import React, { useEffect, useRef } from 'react'
import {useGameContext} from '../Contexts/GameContext'
import { useWordsFetch } from "../Hooks";

function InputBox() {
  const {currentText, setcurrentText, Game, setGame, Progress, setProgress, dispatchWordsDisplay} = useGameContext()
  const inputRef = useRef(null)

  const handleInput = (event) =>{
    if(event.nativeEvent.data == ' ' && (!currentText.length || currentText[currentText.length-1] == ' ') )
      return

    if(event.target.value == "specialgiftformyfriends")
    {
      setProgress({type:'CHEAT', payload: event.target.value})
      setGame({type:'FINISH'})
      dispatchWordsDisplay({})
      return
    }
    setProgress({type: 'CHECK', payload: event.target.value, words: Game.currentWords, checkFails: event.nativeEvent.data == null ? false: true})
    setcurrentText(event.target.value)
  }
  const handleKeyDown = (event) =>{
    if(event.key == 'Enter')
    {
        setProgress({type: "SCORE", correct: Game.currentWords, answer: currentText})
        setGame({type: 'NEXT', score: 5})
        setcurrentText("")
    }
  }

  useEffect(()=>{
    if(Game.status == 'Started' && inputRef.current.style.width != '100%')
    {
      inputRef.current.style.width = '30rem'
      inputRef.current.style.height = '50px'
      inputRef.current.style.opacity = '1'
      inputRef.current.focus()
    }else if(Game.status == 'Finished')
    {
      setProgress({type: 'SCORE', correct: Game.currentWords, answer: currentText})
    }
  }, [Game])
  
  return (
    <div className="text-black relative w-full">
      
      <input className="transition-all duration-500 origin-center w-0 -translate-x-1/2 absolute top-0 left-1/2 p-2 rounded-lg font-bold text-lg" 
      autoComplete='off' type="text" name="text" placeholder="" ref={inputRef} autoCorrect='off'
      value={currentText} onChange={handleInput} onKeyDown={handleKeyDown}/>
      
    </div>
  )
}

export default InputBox