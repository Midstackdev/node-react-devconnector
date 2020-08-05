import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import PostItem from './PostItem'

class PostFeed extends Component {
  render() {
    const { posts } = this.props
    return posts.map(post => <PostItem key={post._id} post={post} />)
  }
}

PostFeed.propsTypes = {
  posts: PropsTypes.array.isRequired
}

export default PostFeed
