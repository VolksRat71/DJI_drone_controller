import io from "socket.io-client";
const localnetwork = '192.168.1.'
const gamingpc = '67'
const raspberrypi = '130'

const socket = io(`http://${localnetwork}${raspberrypi}:6767`);

export default socket;