import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import VideoService from './services/video-service'
const videoHome = window.videoService
delete window.videoService
const videoService = new VideoService({videoHome})

ReactDOM.render(<App videoService={videoService} />, document.getElementById("root"));