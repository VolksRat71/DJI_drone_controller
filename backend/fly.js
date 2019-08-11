const dgram = require("dgram");
const wait = require("waait");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const throttle = require('lodash/throttle');
const commandDelays = require("./commandDelays");

// req & res address for drone functions
const commandPORT = 8889;
const statePORT = 8890;
const HOST = "192.168.10.1";

// converts tello state string into an array of smaller arrays 
function stateParser(state) {
    return state.split(";").map(x => x.split(":"));
};

// drone action recived by port 8889
const drone = dgram.createSocket("udp4");
drone.bind(commandPORT);

// drone state recived by port 8890
const droneState = dgram.createSocket("udp4");
droneState.bind(statePORT);

// drone in development mode
drone.send("command", 0, 7, commandPORT, HOST, handleError);

// res from drone for function error or completeion
drone.on("message", message => {
    console.log(`🚁: ${message}`);
});

// res from drone for state
droneState.on("message", message => {
    state = `${message}`;
    console.log(state.toString());
    const formatState = stateParser(state);
    console.log(formatState);
});



function handleError(err) {
    if (err) {
        console.log("An error has occured");
        console.log(err);
    }
};

// Prebuilt demonstration
function automation() {
    // Array auto-sequence  
    const commands = ["command", "battery?", "height?", "takeoff", "height?", "flip f", "land", "temp?"];
    // Begain loop, const delays refers to commandDelay.js for time intervals
    let i = 0;

    // Auto take-off flip & land
    async function go() {
        const command = commands[i];
        const delay = commandDelays[command];
        console.log(`requesting command: ${command}`);
        drone.send(command, 0, command.length, commandPORT, HOST, handleError);
        await wait(delay);
        i += 1;
        if (i < commands.length) {
            return go();
        }
        // After array has been completed console.log
        console.log("demonstration finished!");
    };

    go();
};

// IO connection setup
io.on("connection", socket => {
    socket.on("command", command => {
        console.log("Mr.Browser your wish is my command");
        console.log(command);
    });

    socket.emit("status", "CONNECTED");
});

droneState.on(
    "message",
    // Data flood throttling
    throttle(state => {
        const formatState = stateParser(state.toString());
        socket.emit("dronestate", formatState);
    }, 100)
);

http.listen(6767, () => {
    console.log("Socket IO server is running")
});