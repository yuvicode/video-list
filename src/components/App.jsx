import React, { Component } from "react";
import '../styles/App.css';
import {Card, Col, CardTitle} from 'react-materialize'
import {Image} from 'cloudinary-react'

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {videos:[]}
  }
    componentDidMount () {
        const {videoService} = this.props
        videoService.getVideosList().then( videos => this.setState({videos}))
    }
  render() {
    const videoList = this.state.videos.map(video =>
      <Col m={6} s={12} key={video.name}>
        <Card className='blue-grey darken-1' textClassName='white-text' title={video.name} actions={[<a href='#'>Watch Now!</a>]}>
          <Image cloudName="candidate-evaluation" resourceType='video' publicId={video.fileName} width="500" crop="scale"/>
        </Card>
      </Col>
    )
    return (videoList)
  }
}

export default App;