import React, { useContext } from 'react';
import UnicornsContainer from './UnicornsContainer';
import CreateUnicorn from './CreateUnicorn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UnicornContext } from './context/UnicornContext';

const UnicornsModule = () => {

  const { unicorns, getUnicorns, editUnicorn } = useContext(UnicornContext)

  return (
    <Router>
      <Routes>
        <Route path="/unicornios" element={<UnicornsContainer getUnicorns={getUnicorns} unicorns={unicorns} />} />
        <Route path="/crear-unicornio" element={<CreateUnicorn />} />
      </Routes>
    </Router>
  )
};

export default UnicornsModule;
