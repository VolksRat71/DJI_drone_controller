# DJI Tello Drone Controller

<p align="center">
  <img height="300" src="https://raw.githubusercontent.com/VolksRat71/DJI_drone_controller/master/readme_img/img.JPG">
</p>

Javascript controller designed to work with DJI Tello (created by Ryze, Intel & DJI) 

## Installation


```bash
git clone https://github.com/VolksRat71/DJI_drone_controller.git
```
#
from root folder 

1. server
```cd backend```
```npm install```

2. ```cd ..```

3. browser 
```cd frontend``` ```npm install```

## Usage
You will need 2 CLI's to run application. (following commands from root folder in order).
#
**From CLI #1**
```
cd backend
npm run dev
```
#
**From CLI #2**
```
cd frontend
npm start
```

## Technologies Used
1. Node.js
- express
- dgram 
- Socket.io 
- lodash
- nodemon
2. React.js 
- lodash
- socket.io-cleint

## Thank you, Wes Bos!
Wes Bos provided me with the build guide, [check out his stuff!](https://wesbos.com/)  