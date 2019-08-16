import React from 'react';
import './App.css';
import DroneState from "./components/DroneState";
import Commands from "./components/Commands";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h4>DJI Tello Drone Controller</h4>
        <div className="row">
          <div className="col s2 card grey darken-4 white-text">
            Battery
          </div>
          <div className="col s6 card grey darken-4 white-text">
            <Commands />
          </div>
          <div className="col s3 card grey darken-4 white-text">
            <DroneState />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;