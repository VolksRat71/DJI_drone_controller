const dgram = require("dgram");
const wait = require("waait");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
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
    const formatState = stateParser(state);
});

// drone in development mode
drone.send("command", 0, 7, commandPORT, HOST, handleError);

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
// comment in line 74 for auto demonstration
// automation();

//commands from browser
io.on("connection", socket => {
    socket.on("command", command => {
        console.log("Command recived from browser.");
        console.log(command);
        // drone in development mode
        drone.send(command, 0, 10, commandPORT, HOST, handleError);
    });

    socket.emit("status", "CONNECTED");
});

// drone state to browser
droneState.on(
    "message",
    state => {
        const formatState = stateParser(state.toString());
        io.emit("dronestate", formatState);
    }
);

// socket listen to port 6767
http.listen(6767, () => {
    console.log("Socket.io server is running")
});