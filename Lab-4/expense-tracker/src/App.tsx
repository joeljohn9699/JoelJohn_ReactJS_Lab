import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ShowList from './components/ShowList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/add' element={<h1> Expense Tracker Add Module </h1>} />
          <Route path='/' element={<ShowList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
