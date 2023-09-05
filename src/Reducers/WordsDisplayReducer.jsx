
const styleConfig = index => {
    if(index == 0 || index == 4)
        return {
            opacity: 0,
            top: index == 0 ? '0': '100%',
            scale: '50%',
            transform: index == 0 ? 'translateY(0)': 'translateY(-100%)'
        }
    else if (index == 1 || index == 3)
        return {
            opacity: 0.5,
            top: index == 1 ? '20%': '80%',
            scale: '80%',
            transform: 'translateY(-50%)'
        }
    else 
        return {
            opacity: 1,
            top: '50%',
            scale: '110%',
            transform: 'translateY(-50%)'
        }
}

const initialState= [
    ...([0,1,2,3,4].map(i => {
        return {
            words: [],
            style: styleConfig(i),
            index: i
        }
    }))
]

const reducer = (state, {currentWords, nextWords}) =>{
    
    if(currentWords === undefined && nextWords === undefined)
    {
        return [...initialState]
    }
    const newState = [...state]
    if(nextWords.length == 0 )
    {
        state.forEach((element, i) => {
            if(element.index == 2)
            {
                newState[i].words = currentWords;
            }
        })
    }
    else
    {
        state.forEach((element, i) => {
            newState[i] = {
                words: element.index == 0 ? nextWords : (element.index == 1 && element.words.length == 0) ? currentWords : element.words,
                style: styleConfig((element.index+1)%5),
                index: (element.index+1)%5
            }
        });
    }

    return newState
    
}

export default {reducer, initialState};