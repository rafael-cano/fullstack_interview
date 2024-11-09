import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import Menu from './components/Menu';

function App() {
  return (
    <>
      <Router>
      <Menu />
        <Routes>
          <Route path="/" element={<SearchPage />} exact />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
