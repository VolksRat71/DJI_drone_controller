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

// drone.send("takeoff", 0, 8, PORT, HOST, handleError);

const commands = ["command", "battery?", "takeoff", "land"];

async function go() {
    const command = commands[i];
    const delay = commandDelays[command];
    console.log(`running command ${command}`);
    drone.send(command, 0, command.length, PORT, HOST, handleError);
    await wait(delay);
    if (i < commands.length) {
        return go()
    }
    console.log("command exicuted");
}