import socket from "../Socket/socket"
import React, { useState } from "react";

function useSocket() {
    const [status, updateStatus] = useState("DISCONNECTED");

    socket.on("status", message => {
        console.log("You've got mail");
        updateStatus(message);
    });
    return status;
};

const DroneState = () => {
    const status = useSocket();
    return (
        <div>
            <p>status: {status}</p>
            I am the drone state
        </div>
    );
};

export default DroneState;