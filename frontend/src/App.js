import React from 'react';
import './App.css';
import DroneState from "./components/DroneState";
import Commands from "./components/Commands";

function App() {
  return (
    <div className="App">
      <DroneState />
      <Commands />
    </div>
  );
};

export default App;