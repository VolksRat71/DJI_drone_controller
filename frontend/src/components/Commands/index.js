import React from "react";
import socket from "../Socket/socket"
import './style.css';


function sendCommand(command) {
    return function () {
        console.log(`command sent: ${command}`);
        socket.emit("command", command);
    };
}

const Commands = () => (
    <div>
        <form action="#">
            <p class="range-field">
                <input type="range" id="test5" min="0" max="100" />
            </p>
        </form>
        <div class="container">
            <div id="left-col" className="row">
                <div className="col s4">
                    <button id="left" class="waves-effect waves-light yellow accent-2 black-text text-darken-2 btn z-depth-2" onClick={sendCommand("forward 100")}>Fore 100cm</button>
                    <button id="left" class="waves-effect waves-light yellow accent-2 black-text text-darken-2 btn z-depth-2" onClick={sendCommand("ccw 90")}>Left 90°</button>
                    <button id="left" class="waves-effect waves-light yellow accent-2 black-text text-darken-2 btn z-depth-2" onClick={sendCommand("left 100")}>Left 100cm</button>
                    <button id="left" class="waves-effect waves-light yellow accent-2 black-text text-darken-2 btn z-depth-2" onClick={sendCommand("forward 100")}>Fore 100cm</button>
                    <button id="left" class="waves-effect waves-light yellow accent-2 black-text text-darken-2 btn z-depth-2" onClick={sendCommand("flip f")}>Flip Fore</button>
                </div>
                <div id="center-col" className="col s4">
                    <button id="center" class="waves-effect waves-light red darken-4 btn z-depth-2" onClick={sendCommand("takeoff")}>Take Off</button>
                    <button id="center" class="waves-effect waves-light red darken-4 btn z-depth-2" onClick={sendCommand("land")}>Land</button>
                    <button id="center" class="waves-effect waves-light orange darken-3 black-text text-darken-2 btn z-depth-2" onClick={sendCommand("emergency")}>Emergency</button>
                </div>
                <div id="right-col" className="col s4">
                    <button id="right" class="waves-effect waves-light btn z-depth-2" onClick={sendCommand("back 100")}>Back 100cm</button>
                    <button id="right" class="waves-effect waves-light btn z-depth-2" onClick={sendCommand("cw 90")}>Right 90°</button>
                    <button id="right" class="waves-effect waves-light btn z-depth-2" onClick={sendCommand("right 100")}>Right 100cm</button>
                    <button id="right" class="waves-effect waves-light btn z-depth-2" onClick={sendCommand("back 100")}>Back 100cm</button>
                    <button id="right" class="waves-effect waves-light btn z-depth-2" onClick={sendCommand("back 100")}>Back 100cm</button>
                </div>
            </div>
        </div>
    </div>
);

export default Commands;