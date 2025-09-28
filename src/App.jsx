import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'
import Books from './components/Books';
import NewBook from './components/NewBook';
import EditBook from './components/EditBook';
import NotFound from './components/NotFound';

const App = () => {
  const api_url = "https://booklist-0mva.onrender.com/api/books/"

  return (
    <div className='bg-all'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Books api_url={ api_url }/>}/>
          <Route path='/add' element={<NewBook api_url={ api_url }/>}/>
          <Route path='/edit/:id' element={<EditBook api_url={ api_url }/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;