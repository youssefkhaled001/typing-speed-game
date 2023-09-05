const initialState = {
    words: [],
    currentWords: [],
    nextWords: [],
    calledForBackup: false,
    finishedWords: [],
    wordsPerPage: 5,
    safeLength: 20,
    status: 'Stopped'
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                words: action.payload.slice(state.wordsPerPage),
                currentWords: action.payload.slice(0, state.wordsPerPage),
                nextWords: action.payload.slice(state.wordsPerPage, 2*state.wordsPerPage),
                status: 'Started'
            };
        case 'NEXT':
            return {
                ...state,
                words: state.words.slice(5),
                currentWords: state.words.slice(0, state.wordsPerPage),
                score: state.score+action.score,
                calledForBackup: (state.words.length < state.safeLength)&&(!state.calledForBackup),
                nextWords: state.words.slice(state.wordsPerPage, 2*state.wordsPerPage)
            };
        case "BACKUP":
            return {
                ...state,
                words: [...state.words, ...action.payload],
                calledForBackup: false
            }
        case "ERROR":
            return {
                ...state,
                status: 'Stopped',
                error: action.error
            }
        case "PREPARING":
            return {
                ...initialState,
                status: "Preparing"
            }
        case "FINISH":
            return {
                ...initialState,
                currentWords: state.currentWords,
                status: 'Finished'
            }
        default:
            return state;
    }
};

const GameReducer = {reducer, initialState}
export default GameReducer