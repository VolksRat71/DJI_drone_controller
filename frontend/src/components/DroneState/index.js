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
            <p>server: {status}</p>
            <p>state: {droneState}</p>
        </div>
    );
};

export default DroneState;