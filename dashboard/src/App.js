import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Book from './Book';
import Member from './Member';
import AddIssuance from './AddIssuance';
import AdvanceSearch from './AdvanceSearch'; 
import Main from './main';
import Category from './Category';
import Collection from './Collection';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<Book />} />
        <Route path="/category" element={<Category />} />
        <Route path="/collection" element={< Collection />} />
        <Route path="/member" element={<Member />} />
        <Route path="/issuance" element={<AddIssuance />} />
        <Route path="/advance-search" element={<AdvanceSearch />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;