c = ""
d = ""
Webcam.set({
    height: 300,
    width: 350,
    image_format:"png",
    png_quality:90
})

cam = document.getElementById("camera");
Webcam.attach('#camera');

function snapshot(){
    Webcam.snap(function(data_uri){document.getElementById("result").innerHTML="<img id='capture_image' src"+data_uri+">" ;});



}

console.log("ml5version.js", ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iPtIAltpv/model.json', modelLoaded);
function modelLoaded(){
    console.log("Working...")
}
function check()
{
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if(error){
        console.error(error);
    } else {
        console.log(results)
        //Why not//
        document.getElementById("emotion_name").innerHTML = results[0].label;
        document.getElementById("emotion_name_2").innerHTML = results[1].label;
        a = results[0].label;
        b = results[1].label;
        speak();
        if(results[0].label == "Happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128578;";
        } else if (results[0].label == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128549;";
        } else if (results[0].label == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }else{
            document.getElementById("update_emoji").innerHTML = "&#128528;";
        }
        if(results[1].label == "Happy")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128578;";
        } else if (results[1].label == "Sad"){
            document.getElementById("update_emoji_2").innerHTML = "&#128549;";
        } else if (results[1].label == "Angry"){
            document.getElementById("update_emoji_2").innerHTML = "&#128548;";
        }else{
            document.getElementById("update_emoji_2").innerHTML = "&#128528;";
        }
    }
}
function speak()
{
    var synth = window.SpeechSynthesis

    a = "My first thought was "+c+".";
    b = "My second thought was "+d+".";
    c = "So you are either "+c+" or "+d+"."
    var utterThis=newSpeechSynthesisUtterance(a+b+c);
    synth.speak(utterThis)
}