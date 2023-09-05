import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage, PlayPage, ResultPage, ScoresPage } from './Pages';
import { NavBar } from './Components';
import './App.css';
import { GameContextProvider } from './Contexts/GameContext'
function App() {
  return (
    <div className='h-screen flex flex-col text-white'>
    <BrowserRouter>
      <NavBar/>
      <div className='bg-mainBg flex-grow flex flex-col p-10'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path= '/play' element={<GameContextProvider><PlayPage/></GameContextProvider>}/>
          <Route path= '/result' element={<ResultPage/>}/>
          <Route path= '/scores' element={<ScoresPage/>}/>
        </Routes>
      </div>
      
    </BrowserRouter>
    </div>
  );
}

export default App;
