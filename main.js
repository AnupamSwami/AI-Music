song1 = "" ;
song2 = "" ;
leftWristX = 0 ;
leftWristY = 0 ;
rightWristX = 0 ;
rightWristY = 0 ;
scoreLeftWrist = 0 ;
scoreRightWrist = 0 ;
songStatus1 = "" ; //JAYA KISHORI SONG//
songStatus2 = "" ; //TIKTOK VIRAL FLUTE//

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

    songStatus1 = song1.isPlaying() ;
    console.log(songStatus1) ;

    songStatus2 = song2.isPlaying() ;
    console.log(songStatus2) ;

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX , leftWristY , 20) ;
        song2.stop() ;
        if(songStatus1 == false) {
            song1.play() ;
        }
        else {
            console.log("Song Name: Jaya Kishori Song") ;
            document.getElementById("song_name").innerHTML = "Song Name : Jaya Kishori Song" ;
        }
    }

    if(scoreRightWrist > 0.2) {
        circle(rightWristX , rightWristY , 20) ;
        song1.stop() ;
        if(songStatus2 == false) {
            song2.play() ;
        }
        else {
            console.log("Song Name : TikTok Viral Flute") ;
            document.getElementById("song_name").innerHTML = "Song Name : TikTok Viral Flute" ;
        }
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results) ;

        scoreRightWrist = results[0].pose.keypoints[10].score ;
        scoreLeftWrist = results[0].pose.keypoints[9].score ;
        console.log("scoreLeftWrist = " + scoreLeftWrist + " scoreRightWrist = " + scoreRightWrist) ;

        leftWristX = results[0].pose.leftWrist.x ;
        leftWristY = results[0].pose.leftWrist.y ;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY) ;

        rightWristX = results[0].pose.rightWrist.x ;
        rightWristY = results[0].pose.rightWrist.y ;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY) ;
    }
}