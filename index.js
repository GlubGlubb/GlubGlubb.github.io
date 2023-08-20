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