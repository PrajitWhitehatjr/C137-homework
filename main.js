 objects=[];
 status="";
 video="";
  
 function setup() {
     video=createCapture(VIDEO);
     canvas=createCanvas(360,350);
     canvas.position(600,300);
     video.hide()
 }

 function start() {
     objectDetector=ml5.objectDetector('cocossd',modelLoaded);
     document.getElementById("objects_detected").innerHTML="Status: Detecting...";
     identifier=document.getElementById("identifier").value;
 }
 
 function modelLoaded() {
     console.log("Model is Loaded Successfuly!");
     status= true;
 }

 function draw() {
     image(video,0,0,360,350);
     if(status != "") {
        objectDetector.detect(video,gotResult);
        for ( i = 0; i < objects.length; i++) {
            document.getElementById("objects_detected").innerHTML="Status : Objects Detecting";
            stroke(255,0,0);
            noFill()
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            fill(255,0,0);
            stroke(255,0,0);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);

            if(objects[i].label == identifier) {
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("objects2").innerHTML="Object Found";
              document.getElementById("objects_detected").innerHTML="Status: Objects Detected";
              var synth= window.speechSynthesis;
              var utter= new SpeechSynthesisUtterance("Object mentioned found");
              synth.speak(utter);
              synth.stop();
            } else{
                document.getElementById("objects2").innerHTML="Object not Found";
                document.getElementById("objects_detected").innerHTML="Status: Objects Detected";
                var synth= window.speechSynthesis;
                var utter= new SpeechSynthesisUtterance("Object mentioned not found");
                synth.speak(utter);
                synth.stop();
            }
             
         }
     }
 }

 function gotResult(error,results) {
     if (error) {
        console.error(error);
     } else {
        objects= results;
        console.log(results);
     }
 }
