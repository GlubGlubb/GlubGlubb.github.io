var video1 = document.querySelector("#videoElement1");
var video2 = document.querySelector("#videoElement2");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ audio: false, 'video':{
    facingMode:"environment"
  } })
    .then(function (stream) {
      video1.srcObject = stream;
      video2.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Failed to get camera");
    });
}

var model = undefined;

cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  predict()
});



function predict()
{
  // detect objects in the image.
  model.detect(video1).then(predictions => {
    draw(predictions);
  });
  requestAnimationFrame(predict)
}

var canvas1 = document.querySelector("#canvas1");
var canvas2 = document.querySelector("#canvas2");
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');

function draw(predictions)
{
  canvas1.width = video1.videoWidth;canvas1.height = video1.videoHeight;
  ctx1.strokStyle = "Red"
  ctx1.fillStyle = "transparent"
  ctx1.strokeWidth = 5;
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  
  for(var i = 0; i < predictions.length;i++)
  {
   // console.log(predictions[i]["bbox"]);
    ctx1.rect(predictions[i]["bbox"][0],
    predictions[i]["bbox"][1],
    predictions[i]["bbox"][2],
    predictions[i]["bbox"][3]
    )
    ctx1.stroke();
  }

}