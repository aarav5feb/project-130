
song1 = "";
song2 = "";
leftWristX = 0;
leftWristY=0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
music1 = "";
music2 =""; 
scoreRightWrist =0;
status = "";
function preload(){
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function modelLoaded(){
    console.log('PoseNet Is Initialized');
}


function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    music2 = song2.isPlaying();
    console.log(music2);
    music1=song1.isPlaying();
    console.log(music1);

    if(scoreLeftWrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(music2== false){
        music2.play();
    }   
    else{
        document.getElementById("song_name").innerHTML = "Song Name: Music2";
    }


}




if(scoreRightWrist>0.2)
{
circle(rightWristX,rightWristY,20);
song2.stop();
if(music1== false){
    music1.play();
}   
else{
    document.getElementById("song_name").innerHTML = "Song Name: Music1";
}


}
}




function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;  
        console.log("leftWristX =" + leftWristX+ "leftWristY ="+ leftWristY);
       rightWristX=results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       console.log("rightWristX = "+ rightWristX+ "rightWristY =" + rightWristY);  
    }
}