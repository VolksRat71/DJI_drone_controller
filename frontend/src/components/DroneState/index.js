import socket from "../Socket/socket"
import React, { useState, useEffect } from "react";

function useDroneState() {
    const [droneState, updateDroneState] = useState([]);
    useEffect(() => {
        console.log("Drone state stream commence.");
        socket.on("dronestate", updateDroneState);
    }, []);
    return droneState;
};

function useSocket() {
    const [status, updateStatus] = useState("DISCONNECTED");
    useEffect(() => {
        socket.on("status", updateStatus);
    }, []);
    return status;
};

const DroneState = () => {
    const status = useSocket();
    const droneState = useDroneState([]);
    return (
        <div>
            <p>Server: {status}</p>
            <p>Pitch: {droneState.pitch}</p>
            <p>Roll: {droneState.roll}</p>
            <p>Yaw: {droneState.yaw}</p>
            <p>Height: {droneState.h}</p>
            <p>Speed: {droneState.speed}</p>
            <p>Tempurature: {droneState.temp}</p>
        </div>
    );
};

export default DroneState;