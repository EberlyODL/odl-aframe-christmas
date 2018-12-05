window.addEventListener('load', () => {
  const infoBlock = document.getElementById('info-block')
  const refreshButton = document.getElementById('refreshButton')
  const santaRide = document.getElementById('santa-ride')

  santaRide.play()
  setTimeout(() => {
    santaRide.pause()
  }, 2000);

  refreshButton.addEventListener('click', e => {
    // restart gaze target
    const videoContainer = document.getElementById('videoContainer')
    videoContainer.innerHTML = `<a-videosphere gaze-target src="#santa-ride"></a-videosphere>`
    // restart video
    santaRide.pause()
    santaRide.currentTime = 0
    santaRide.play()
    setTimeout(() => {
      santaRide.play()
    }, 1000);
  })


  // disable ride button
  santaRide.addEventListener('play', e => {
    infoBlock.setAttribute('disabled', '')
  })
  santaRide.addEventListener('ended', e => {
    infoBlock.removeAttribute('disabled')
  })
  santaRide.addEventListener('pause', e => {
    infoBlock.removeAttribute('disabled')
  })
})


AFRAME.registerComponent('gaze-target', {
  init: function () {
    // const gazeTarget = this.el
    // let previousRect = null
    // var video = document.getElementById('video');
    // var canvas = document.getElementById('canvas');
    // var context = canvas.getContext('2d');
    // var tracker = new tracking.ObjectTracker('face');
    // tracker.setInitialScale(4);
    // tracker.setStepSize(0.5);
    // tracker.setEdgesDensity(0.1);
    // tracking.track('#video', tracker, { camera: true });
    // tracker.on('track', function (event) {
    //   context.clearRect(0, 0, canvas.width, canvas.height);
    //   event.data.forEach(function (rect) {
    //     if (rect.color === 'custom') {
    //       rect.color = tracker.customColor;
    //     }
    //     context.strokeStyle = rect.color;
    //     context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    //     context.font = '11px Helvetica';
    //     context.fillStyle = "#fff";
    //     context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    //     context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

    //     moveTarget(rect)
    //   });
    // });

    const moveTarget = rect => {
      if (previousRect) {
        // if (
        //   Math.abs(rect.x - previousRect.x) > 10 ||
        //   Math.abs(rect.y - previousRect.y) > 10
        // ) return
        if (
          Math.abs(rect.x - previousRect.x) < 3 &&
          Math.abs(rect.y - previousRect.y) < 3
        ) return
        previousRect = rect
      }
      if (previousRect == null) {
        previousRect = rect
      }

      gazeTarget.object3D.rotation.set(
        THREE.Math.degToRad(0),
        THREE.Math.degToRad(rotationScaleX(rect.x)),
        THREE.Math.degToRad(rotationScaleY(rect.y)),
      )
    }

    const rotationScaleX = d3.scaleLinear().domain([0, 200]).range([-50, 50])
    const rotationScaleY = d3.scaleLinear().domain([0, 200]).range([-50, 90])
  }
});
