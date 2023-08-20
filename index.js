function isMobile() {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isAndroid || isiOS;
  }
  console.log('s')
  
  async function setupCamera() {
    const isPortrait = true; // do logic here
  
    let video = document.getElementById('videoElement');
  
    console.log("Getting video");
  
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
  
    console.log("Calling getUserMedia");
  
    return new Promise((resolve) => {
      (async() => {
        await navigator.mediaDevices.getUserMedia({
            'audio': false,
            'video': {
              facingMode: 'user',
              width: isPortrait ? 480 : 640,
              height: isPortrait ? 640 : 480,
            },
          })
          .then((stream) => {
            console.log("Got getUserMedia stream");
            video.srcObject = stream;
            video.play();
            resolve(true);
          })
          .catch((err) => {
            console.log("Encountered getUserMedia error", err);
            resolve(false);
          });
      })();
    });
  
  }
  
  (async() => {
    const ret = await setupCamera();
    console.log(`Initialised camera: ${ret}`)
  })();