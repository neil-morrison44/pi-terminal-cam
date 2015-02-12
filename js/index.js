var RaspiCam = require("raspicam");
var pictureTube = require("picture-tube");
var gm = require("gm").subClass({ imageMagick: true });
var tty = require("tty");

var camera = new RaspiCam({
  mode:"photo",
  output:"./images/image.png",
  encoding:"png",
  timeout: 0
});

//to take a snapshot, start a timelapse or video recording




//listen for the "start" event triggered when the start method has been successfully initiated
camera.on("start", function(){
    //do stuff
});

//listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function(err, timestamp, filename){

    if (filename.indexOf("~") === -1){
      console.log("read", arguments);
      camera.stop();
    }
});

//listen for the "stop" event triggered when the stop method was called
camera.on("stop", function(){
  //do stuff

  var tube = pictureTube({cols: Math.floor(tty.WriteStream().columns*0.95)});
  tube.pipe(process.stdout);

  gm("./images/image.png")
    .flip()
    .modulate(150,150)
    .normalize()
    .stream().pipe(tube);
});

//listen for the process to exit when the timeout has been reached
camera.on("exit", function(){
    //do stuff
});

camera.start( );
//to stop a timelapse or video recording
