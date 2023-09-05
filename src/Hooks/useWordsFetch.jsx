import React, {useEffect} from 'react'
import { useGameContext } from '../Contexts/GameContext'
const randomWords = [
  "Tree", "House", "Hello", "Hey", "Okay", "Sun", "Moon", "Star", "Ocean", "Mountain",
  "River", "Fire", "Air", "Earth", "Light", "Shadow", "Rain", "Thunder", "Snow", "Ice",
  "Flower", "Breeze", "Whisper", "Laughter", "Silence", "Hope", "Dream", "Journey", "Adventure",
  "Magic", "Wonder", "Chaos", "Calm", "Love", "Friendship", "Family", "Unity", "Time", "Space",
  "Miracle", "Smile", "Laughter", "Song", "Dance", "Reflection", "Serendipity", "Enchantment", "Infinite"
];
function useWordsFetch() {
    const {Game, setGame, setProgress} = useGameContext()

    useEffect(()=>{
        setGame({type: "PREPARING"})
        setProgress({type: "RESET"})
        fetch('https://random-word-api.herokuapp.com/word?number=50')
        .then(response => response.json())
        .then(data => {
          setGame({type: 'START', payload: data})
        })
        .catch(error => setGame({type: "ERROR", error: error}))
        
    },[])

    useEffect(()=>{
      if(Game.calledForBackup)
      {
        fetch('https://random-word-api.herokuapp.com/word?number=50')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setGame({type: 'BACKUP', payload: data})
          console.log(Game)
        })
        .catch(error => console.error("Error Fetching Data"))
      }
    }, [Game.calledForBackup])
}

export default useWordsFetch