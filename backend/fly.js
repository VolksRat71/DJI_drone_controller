const dgram = require('dgram');
const wait = require('waait');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const throttle = require('lodash/throttle');
const commandDelays = require('./commandDelays');

const PORT = 8889;
const HOST = '192.168.10.1';
const drone = dgram.createSocket('udp4');
drone.bind(PORT);

function parseState(state) {
    return state
        .split(';')
        .map(x => x.split(':'))
        .reduce((data, [key, value]) => {
            data[key] = value;
            return data;
        }, {});
}

const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

drone.on('message', message => {
    console.log(`🚁 : ${message}`);
    io.sockets.emit('status', message.toString());
});

function handleError(err) {
    if (err) {
        console.log('ERROR');
        console.log(err);
    }
}

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

io.on('connection', socket => {
    socket.on('command', command => {
        console.log('command Sent from browser');
        console.log(command);
        drone.send(command, 0, command.length, PORT, HOST, handleError);
    });
    setInterval(function () {
        socket.emit("status", "CONNECTED");
    }, 1000);
});

droneState.on(
    'message',
    throttle(state => {
        const formattedState = parseState(state.toString());
        io.sockets.emit('dronestate', formattedState);
    }, 100)
);

http.listen(6767, () => {
    console.log('Socket io server up and running');
});