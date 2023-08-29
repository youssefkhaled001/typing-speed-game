import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage, PlayPage, ResultsPage } from './Pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={HomePage}/>
          <Route path= '/play' element={PlayPage}/>
          <Route path= '/result' element={ResultPage}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
