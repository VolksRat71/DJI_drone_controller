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
        <button onClick={sendCommand("up 100")}>Up 100cm</button>
        <button onClick={sendCommand("down 100")}>Down 100cm</button>
        <button onClick={sendCommand("right 100")}>Right 100cm</button>
        <button onClick={sendCommand("left 100")}>Left 100cm</button>
        <button onClick={sendCommand("forward 100")}>Forward 100cm</button>
        <button onClick={sendCommand("back 100")}>Back 100cm</button>
        <button onClick={sendCommand("cw 90")}>Right 90°</button>
        <button onClick={sendCommand("ccw 90")}>Left 90°</button>
        <button onClick={sendCommand("flip f")}>Flip Forward</button>
        <button onClick={sendCommand("emergency")}>Emergency</button>
    </div>
);

export default Commands;