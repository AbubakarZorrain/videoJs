import VideoJS from './Video'
import './App.css'
const App = () => {

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    preload: true,
    sources: [{
      src: '/video.mp4',
      type: 'video/mp4'
    }],
    userActions: {
      doubleClick: false,
    },
  };


  return (
    <>
      <VideoJS options={videoJsOptions}  />
    </>
  );
}
export default App