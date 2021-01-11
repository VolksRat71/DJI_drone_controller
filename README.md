<p align="center">
    <img width="65%" src="./readme_img/Tello_Controller.png"/>
</p>

___

<br>

<p align="center">
    <img width="85%" src="./readme_img/DroneAnimation.gif"/>
</p>

<br>

<h1 align="center">
    What is going on here?!
</h1>

<p>
This was an independent project that built as a student. Also, this model of drone is intended for STEAM education. In this regard its firmware allows for UDP commands to an I.P address to manipulate the drone flight pattern.

So we take advantage of that by binding the drone I.P to a PORT on a node server to send commands through. We just needed something to interface with the Node server at that point. I used React.js in this case!

In the end we end up with a stack where the user has a nice and clean interface that sends a through a Socket.io PORT using React Hooks, the Node server takes those commands and translates them to the Drone. Cake! 🍰

___

<h3 align="center">
    The frontend is hosted on <a href="https://dji-drone-example.herokuapp.com/">Heroku here</a>! But to get the full effect you will need a DJI Tello drone!
</h3>






