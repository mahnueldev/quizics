import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from '../src/components';
import { Home } from '../src/pages/index';

import '../src/tailwind.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
