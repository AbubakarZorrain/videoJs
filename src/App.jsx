import React from 'react';
import VideoJS from './Video'
import './App.css'
const App = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: '../video.mp4',
      type: 'video/mp4'
    }],
    userActions: {
      doubleClick: false,
    },
  };


  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
  
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
    player.on('dblclick', function (event) {
      event.stopImmediatePropagation();
      console.log("mmmmmmmmmmmmmmmmmmmmmmmmm", event);
      event.preventDefault();
        event.stopPropagation();
   })
  };

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
}
export default App