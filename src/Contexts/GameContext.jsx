import React, {createContext, useContext, useEffect, useReducer, useState} from "react";
import {GameReducer, ProgressReducer, WordsDisplayReducer} from '../Reducers'
const GameContext = createContext();

export const GameContextProvider = ({children}) =>{
    const [currentText, setcurrentText] = useState("")
    const [Game, setGame] = useReducer(GameReducer.reducer, GameReducer.initialState)
    const [Progress, setProgress] = useReducer(ProgressReducer.reducer, ProgressReducer.initialState)
    const [WordsDisplay, dispatchWordsDisplay] = useReducer(WordsDisplayReducer.reducer, WordsDisplayReducer.initialState)
    return <GameContext.Provider value={{currentText, setcurrentText, Game, setGame, Progress, setProgress, WordsDisplay, dispatchWordsDisplay}}>
        {children}
    </GameContext.Provider> 
}

export const useGameContext = () => useContext(GameContext)




/*
 useEffect(()=>{
      console.log("Detected Backup")
      if(readyForBackup)
      {
          console.log("Load Backup")
          setGame({type: "BACKUP", payload: backupPayload})
          setreadyForBackup(false);
          
          console.log("Leaving")
      }
  },  [readyForBackup])

  useEffect(()=>{
    console.log("Game Changed")
    console.log(Game)
      if(Game.calledForBackup && !readyForBackup)
      {
          console.log("Called For Backup")
          setTimeout(()=>{
              setreadyForBackup(true)
              console.log("Backup Is Here")
          }, 1000)
      }

  }, [Game])
*/