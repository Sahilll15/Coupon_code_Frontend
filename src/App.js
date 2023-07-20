import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';




import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import Addcoupons from './pages/Addcoupons';



function App() {
  return (
    <Router>

      <Navbar />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/addcoupons" element={< Addcoupons />} />
        <Route path="*" element={< PageNotFound />} />
      </Routes>


    </Router>
  );
}

export default App;
