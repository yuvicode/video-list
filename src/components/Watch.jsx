import React, { Component } from 'react'
import {Card, Col, CardTitle} from 'react-materialize'
import {Video} from 'cloudinary-react'
import Comments from 'recomment'
class Watch extends Component {
  constructor(props) {
    super(props);
    const comments = this.props.videoInfo.comments ? this.props.videoInfo.comments : []
    this.state = {videoInfo:null, comments}
    this.addComment = this.addComment.bind(this);
  }
  componentDidMount(){
    this.props.videoService.getVideoInfo(this.props.videoInfo.url).then(
      videoInfo => this.setState({videoInfo})
    )
  }
  addComment(comment){
    const comments = this.state.comments.map( comment => comment)
    comments.push(comment)
    this.props.videoInfo.comments = comments
    this.setState({comments})
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
        <div>
          <video controls="controls" height="360" loop="loop" width="480">
            <source src={this.getVideoUrl(data.url, this.props.cloudinaryCloudName)} type="video/mp4" />
            Your browser does not support HTML5 video tags.
          </video>
        </div>
        <div>{data.description}</div>
        <div>
          <Comments onAddComment={this.addComment} comments={this.state.comments} />
        </div>
      </Card>

    </Col>)
  }
}

export default Watch
