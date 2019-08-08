const dgram = require("dgram");
const wait = require("waait");
const commandDelays = require("./commandDelays");


const PORT = 8889;
const HOST = "192.168.10.1";

const drone = dgram.createSocket("udp4");
drone.bind(PORT);

drone.on("message", message => {
    console.log(`🚁: ${message}`);
});

function handleError(err) {
    if (err) {
        console.log("An error has occured");
        console.log(err);
    }
};

const commands = ["command", "battery?", "takeoff", "land"];

let i = 0;

drone.send('command', 0, 'command'.length, PORT, HOST, handleError);

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
    console.log('demonstration finished!');
};