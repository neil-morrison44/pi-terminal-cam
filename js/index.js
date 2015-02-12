var RaspiCam = require("raspicam");
var pictureTube = require("picture-tube");
var gm = require("gm").subClass({ imageMagick: true });

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
    camera.stop();
    console.log("read", arguments);
    // var pngFile = filename.replace("jpg","png");
    // gm(filename)
    // .noProfile()
    // .write(pngFile, function (err) {
    //   if (!err){
    //     console.log("changed to png");
        
        //do stuff
        var tube = pictureTube();
        tube.pipe(process.stdout);

        var fs = require('fs');
        fs.createReadStream(filename).pipe(tube);
    //   }else{
    //     console.log("error",err);
    //   }
    // });

});

//listen for the "stop" event triggered when the stop method was called
camera.on("stop", function(){
    //do stuff
});

//listen for the process to exit when the timeout has been reached
camera.on("exit", function(){
    //do stuff
});

camera.start( );
//to stop a timelapse or video recording
