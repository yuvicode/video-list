import React, { Component } from "react";
import {Card, Col, CardTitle} from 'react-materialize'
import {Video} from 'cloudinary-react'

class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {videoInfo:null}
  }
  componentDidMount(){
    this.props.videoService.getVideoInfo(this.props.videoInfoUrl).then(
      videoInfo => this.setState({videoInfo})
    )
  }
  getVideoUrl(url,cloudinaryCloudName) {
    const fileName = url.split('/').pop()
    return `https://res.cloudinary.com/${cloudinaryCloudName}/video/upload/c_pad,h_360,w_480,q_70,du_10/${fileName}`
  }
  render(){
    const data = this.state.videoInfo
    if(!data){
      return (<div></div>)
    }
    return (  <Col m={6} s={12} >
      <Card className='blue-grey darken-1' title={data.name} textClassName='white-text'>
        <video controls="controls" height="360" loop="loop" width="480">
          <source src={this.getVideoUrl(data.url, this.props.cloudinaryCloudName)} type="video/mp4" />
          Your browser does not support HTML5 video tags.
        </video>
        <div>{data.description}</div>
      </Card>

    </Col>)
  }
}

export default Watch
