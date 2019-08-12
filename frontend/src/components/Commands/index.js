import React from "react";
import socket from "../Socket/socket"

function sendCommand(command) {
    return function () {
        console.log(`command sent: ${command}`);
        socket.emit("command", command);
    };
}

const Commands = () => (
    <div>
        <button onClick={sendCommand("takeoff")}>Take Off</button>
        <button onClick={sendCommand("land")}>Land</button>
        <button onClick={sendCommand("up 20")}>Up 20</button>
        <button onClick={sendCommand("down 20")}>Down 20</button>
        <button onClick={sendCommand("right 20")}>Right 20</button>
        <button onClick={sendCommand("left 20")}>Left 20</button>
        <button onClick={sendCommand("forward 20")}>Forward 20</button>
        <button onClick={sendCommand("back 20")}>Back 20</button>
        <button onClick={sendCommand("land")}>Land</button>
        <button onClick={sendCommand("flip f")}>Flip Forward</button>
        <button onClick={sendCommand("emergency")}>Emergency</button>
    </div>
);

export default Commands;