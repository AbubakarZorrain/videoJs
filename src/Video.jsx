import React,{useEffect} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props;


  useEffect(() => {

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
         videojs.log('player is ready');
         const controlBar = player.controlBar;
         let forwardButton = controlBar.addChild('button', {}, 1);
         var forwardButtonDom = forwardButton.el();
         forwardButtonDom.innerHTML = '<span class="vjs-icon-forward-10"></span>';
         forwardButton.controlText("Skip 10 Sec");
         forwardButtonDom.onclick = function () { seek(10)};
         forwardButtonDom.addEventListener('touchstart', function() {
            seek(10);
    });
         let backwardButton = controlBar.addChild('button', {}, 0);
         var backwardButtonDom = backwardButton.el();
         backwardButtonDom.innerHTML = '<span class="vjs-icon-replay-10"></span>';
         backwardButton.controlText("Replay 10 Sec");
         backwardButtonDom.onclick = function () { seek(-10)};
         backwardButtonDom.addEventListener('touchstart', function() {
                seek(-10);

        });
        videoElement.addEventListener('dblclick', (e)=>{handleDoubleClick(e)});
         onReady && onReady(player);
      });

      const seek = (seconds) => {
         const newTime = player.currentTime() + seconds;
         player.currentTime(newTime);
       };
       const handleDoubleClick = (event) => {
        
        event.stopImmediatePropagation();
        event.preventDefault();
        event.stopPropagation();
        const playerWidth = player.currentWidth(); // Get player width
        const clickX = event.clientX - videoRef.current.getBoundingClientRect().left;
      
        const isLeftThird = clickX < playerWidth / 3;
        const isRightThird = clickX > (playerWidth * 2) / 3;
              if (isLeftThird) {
          seek(-10); // Skip backward
        } else if (isRightThird) {
          seek(10); // Skip forward
        }else{

          player.isFullscreen()? player.exitFullscreen():player.requestFullscreen();
        }
       };

    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJS;