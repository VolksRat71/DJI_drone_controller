import React from 'react';
import './App.css';
import DroneState from "./components/DroneState";
import Commands from "./components/Commands";

function App() {
  return (
    <div className="App">
      <Commands />
      <DroneState />
    </div>
  );
};

export default App;