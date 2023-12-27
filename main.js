song1 = "" ;
song2 = "" ;
leftWristX = 0 ;
leftWristY = 0 ;
rightWristX = 0 ;
rightWristY = 0 ;
scoreLeftWrist = 0 ;
songStatus1 = "" ;
songStatus2 = "" ;

function preload() {
    song1 = loadSound("song1.mp3") ;
    song2 = loadSound("song2.mp3") ;
}

function setup() {
    canvas = createCanvas(425,300) ;
    canvas.position(500,200) ;
    video = createCapture(VIDEO) ;
    video.size(400,300) ;
    video.hide() ;

    poseNet = ml5.poseNet(video , modelLoaded) ;
    poseNet.on('pose' , gotPoses) ;
}

function modelLoaded() {
    console.log("PoseNet Is Initialised") ;
}

function draw() {
    background('white') ;
    image(video , 0 , 0 , 425 , 300) ;
    fill('#F94449') ;
    stroke('#F94449') ;

    if(scoreLeftWrist > 0.2) {
        songStatus1 = song1.isPlaying() ;
        circle(leftWristX , leftWristY , 20) ;
        song2.stop() ;
    } if(songStatus1 = "false") {
        song1.play() ;
        document.getElementById("song_name").innerHTML = "Song Name - Jaya Kishori Song" ;
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results) ;

        scoreLeftWrist = results[0].pose.keypoints[9].score ;
        console.log("scoreLeftWrist = " + scoreLeftWrist) ;

        leftWristX = results[0].pose.leftWrist.x ;
        leftWristY = results[0].pose.leftWrist.y ;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY) ;

        rightWristX = results[0].pose.rightWrist.x ;
        rightWristY = results[0].pose.rightWrist.y ;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY) ;
    }
}

function play() {
    song.play() ;
}