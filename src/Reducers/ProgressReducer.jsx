const initialState = {
    score: 0,
    fails: 0,
    totalChars: 0,
    currentWordsProgress: [],
    currentFails: {},
}

const calculateScore = (correct, answer) => {
    answer = answer.split(' ')
    let count = 0
    let charSum = 0
    correct.forEach((word,i) => {
        if(word===answer[i])
        {
            count++
        }
        charSum += word.length
    })
    return {score: count, chars: charSum}
}
const checkWords = (words, currentInput, currentFails) => {
    let res = []
    let failsMap = {...currentFails}
    if(currentInput.length > 0)
    {
        currentInput.split(' ').forEach((word, i) => {
            res.push([])
            if (i < words.length) {
                if(word.length > words[i].length)
                {
                    failsMap[word[word.length-1]+' '+i] = true
                    res[i].push({correct: false, char: words[i]})
                }
                else
                {    
                    for (let index=0; index < words[i].length; index++) {
                        if(index < word.length)
                        {
                            if(word[index] == words[i][index])
                                res[i].push({correct: true, char: words[i][index]})
                            else
                            {
                                failsMap[word[index]+' '+index+' '+i] = true
                                res[i].push({correct: false, char: words[i][index]})
                            }
                        }else{
                            res[i].push({correct:false, char: words[i].slice(index)})
                            break;
                        }
                    }
                    
                }
        }});
    }
    for(let index= res.length; index<words.length; index++)
    {
        res.push([{correct: null, char: words[index]}])
    }
    return {res, fails: failsMap}
}

const reducer = (state, action) =>{
    switch (action.type){
        case "NEXT":
        {
            const {res} = checkWords(action.words, '', state.currentFails)
            return {
                ...state,
                currentWordsProgress: res,
            }
        }
        case "CHECK":
        {
            const {res, fails} = checkWords(action.words, action.payload, state.currentFails)
            return{
                ...state,
                currentWordsProgress: res,
                currentFails: fails
            }
        }
        case "SCORE":
        {
            state.currentWordsProgress.forEach(word => word.forEach(char=>{
                if(char.correct==null)
                    char.correct = false
                return char
            }))
            
            const {score, chars} = calculateScore(action.correct, action.answer)
            return{
                ...state,
                currentWordsProgress: state.currentWordsProgress,
                score: state.score+ score,
                fails: state.fails + Object.keys(state.currentFails).length,
                currentFails: {},
                totalChars: state.totalChars+chars
            }
        }
        case "RESET":
        {
            return {...initialState}
        }
        case "CHEAT":
        {
            if(action.payload == 'specialgiftformyfriends')
                return{
                    ...initialState,
                    score: 69,
                    totalChars: 100,
                    fails: 30.31
                }   
        }
        default:
            return state
    }
}

const ProgressReducer = {reducer, initialState}
export default ProgressReducer