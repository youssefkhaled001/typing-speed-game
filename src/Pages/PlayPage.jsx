import React , {useEffect, useRef, useState} from 'react'
import { InputBox, WordsWindow, ErrorDisplay, LoadingIcon, Score, BeforeGame } from '../Components'
import { useGameContext } from '../Contexts/GameContext'
import GameManager from '../service/GameManager'
import '../Components/external/playButton.css'

function PlayPage() {
  const buttonRef = useRef(null)
  const [startGame, setstartGame] = useState(false)
  const {Game, Progress, setcurrentText, WordsDisplay} = useGameContext();

  const StartGame = ()=>{
    buttonRef.current.style.transform = 'scale(0, 1)'
    buttonRef.current.style.opacity = '0'
    setstartGame(true);
  }

  useEffect(()=>{
    if(Game.status == 'Stopped' || Game.status == 'Finished')
    {
      buttonRef.current.style.transform = 'scale(1, 1)'
      buttonRef.current.style.opacity = '1'
      setstartGame(false);
      setcurrentText('');
    }
  }, [Game.status])

  return (
        <div className='flex flex-col items-center relative'>
          <div className='w-4/6 bg-navBarBg aspect-video rounded-3xl text-xl flex flex-col justify-between items-center p-5'>
            <div className='flex-grow flex justify-center items-center'>
              {
                Game.error ? <ErrorDisplay err= {Game.error} />
                : 
                Game.status == 'Preparing'? <LoadingIcon/>
                :
                Game.status == 'Started'? <WordsWindow/>
                :
                Game.status == 'Finished'? <Score/>
                : 
                <BeforeGame/>
              }
            </div>
          </div>
          {(Game.status != 'Stopped' && Game.status != 'Finished') && <InputBox/>}
          <button className="playButton transition-all duration-500 absolute top-0 left-0 overflow-hidden m-5" onClick={StartGame} ref={buttonRef}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="svgIcon" viewBox="0 0 16 16" id="IconChangeColor"> <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
              <div>
                Play Now
              </div>
          </button>
          {startGame && <GameManager/>}
        </div>
  )
}

export default PlayPage