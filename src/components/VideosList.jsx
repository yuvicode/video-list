import React, { Component } from "react";
import '../styles/App.css';
import {Card, Col, CardTitle} from 'react-materialize'
import {Image} from 'cloudinary-react'
import { Link} from 'react-router-dom'

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {videoList:[]}
  }
  render() {
    const videoList = this.props.videoList ? this.props.videoList.map(video =>
      <Col m={6} s={12} key={video.name}>
        <Card className='blue-grey darken-1' title={video.name} textClassName='white-text'>
          <Image cloudName={this.props.cloudinaryCloudName} resourceType='video' publicId={video.fileName} width={window.innerWidth -50} crop="scale"/>
          <div>
            <Link to={`/watch/${video.name}`}>Watch Now </Link>
          </div>
        </Card>
      </Col>
    ) : []
    return (videoList)
  }
}

export default App;