const dgram = require("dgram");
const wait = require("waait");
const commandDelays = require("./commandDelays");

// req & res address for drone functions
const PORT = 8889;
const HOST = "192.168.10.1";

const drone = dgram.createSocket("udp4");
drone.bind(PORT);

// // req & res address for drone state
// const droneState = dgram.createSocket("udp4");
// droneState.bind(8890);

// res from drone for function error or completeion
drone.on("message", message => {
    console.log(`🚁: ${message}`);
});

// res from drone for state
// droneState.on("message", message => {
//     console.log(`🚁: ${message}`);
// });

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
        drone.send(command, 0, command.length, PORT, HOST, handleError);
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