import React, { useEffect, useState } from 'react'

function useTimer() {
    const [seconds, setseconds] = useState(0)
    const [miliSeconds, setmiliSeconds] = useState(0)
    const [minutes, setminutes] = useState(0)
    const [tid, settid] = useState(null)
    const [Status, setStatus] = useState('Stop');

    const Stop = ()=>{
        clearInterval(tid);
        setStatus('Stop');
    }
    const Start =()=>{
        setmiliSeconds(0);
        setseconds(0);
        setminutes(0);
        setStatus('Start')
    }

    useEffect(()=>{
        if(Status == 'Start')
        {
            settid(setInterval(()=>{
                setmiliSeconds((prev)=>prev+10)   
            }, 10))
        }
        return ()=>{
            clearInterval(tid)
        }
    }, [Status])

    useEffect(()=>{
        if(miliSeconds >= 1000)
        {
            setmiliSeconds(0)
            setseconds(prev=>prev+1)
        }
    }, [miliSeconds])

    useEffect(()=>{
        if(seconds >= 60)
        {
            setseconds(0)
            setminutes(prev=>prev+1)
        }
    }, [seconds])

    return {
        time: {miliSeconds, seconds, minutes},
        operations: {Start, Stop}
    }
}

export default useTimer