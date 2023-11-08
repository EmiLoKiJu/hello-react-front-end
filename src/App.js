import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Greeting from './components/Greeting';
import Authentication from './components/Authentication';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/greeting" element={<Greeting />} />
    </Routes>
  </BrowserRouter>
);

export default App;
