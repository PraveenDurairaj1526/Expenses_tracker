import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview';
import ManageExpenses from './pages/ManageExpenses';
import ManageCategory from './pages/ManageCategory';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/manage-expenses' element={<ManageExpenses />} />
        <Route path='/manage-category' element={<ManageCategory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
