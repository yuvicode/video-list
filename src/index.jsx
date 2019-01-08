import React, {Component} from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import VideosList from './components/VideosList.jsx'
import Watch from './components/Watch'
import VideoService from './services/video-service'

const cloudinaryCloudName = window.cloudinaryCloudName
const cloudinaryResource = window.cloudinaryResource
delete window.cloudinaryCloudName,
delete window.cloudinaryResource
const videoService = new VideoService({cloudinaryCloudName, cloudinaryResource})

let videoMainList = []
class App extends Component {
  render(){
    const newChildren = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { videoList: this.state.videoList })
    })
    return newChildren
  }
  constructor(props) {
    super(props)
    this.state = {videoList:[]}
  }
  componentDidMount () {
    videoService.getVideosList().then( videoList => {
      videoMainList = videoList
      this.setState({videoList})})
  }
}

const getVideoByName = (list, name) => {
  let len = list.length
  for(let index = 0 ;index < len; index ++){
    if (list[index].name === name){
      return list[index].url
    }
  }
}

const routing = (
  <Router>
    <App>
      <Route exact path="/" render={(props) => <VideosList videoList={videoMainList} cloudinaryCloudName={cloudinaryCloudName} />} />
      <Route path="/watch/:name" render={(props) => <Watch videoService={videoService} videoInfoUrl={getVideoByName(videoMainList, props.match.params.name)}  cloudinaryCloudName={cloudinaryCloudName}/>} />
    </App>
  </Router>
)
ReactDOM.render(routing, document.getElementById("root"));