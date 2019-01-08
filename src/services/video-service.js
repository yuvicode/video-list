import axios from 'axios'
class videoService {
  constructor ({ cloudinaryCloudName, cloudinaryResource }) {
    this.videoHome = `http://res.cloudinary.com/${cloudinaryCloudName}/raw/upload/${cloudinaryResource}`
  }
  getVideosList () {
    return axios.get(this.videoHome).then(res => res.data).then(videoList => videoList.map(video => {
      video.fileName = video.image.split('/').pop()
      return video
    }))
  }

  getVideoInfo (url) {
    return axios.get(url).then(res => res.data)
  }
}

export default videoService
