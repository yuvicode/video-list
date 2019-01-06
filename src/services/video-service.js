import axios from 'axios'
class videoService {
  constructor ({ videoHome }) {
    this.videoHome = videoHome
  }
  getVideosList () {
    return axios.get(this.videoHome).then(res => res.data).then(videoList => videoList.map(video => {
      video.fileName = video.image.split('/').pop()
      return video
    }))
  }
}

export default videoService
