import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/post'

class PostItem extends Component {

  onDeleteClick (postId) {
    this.props.deletePost(postId)
  }

  onLikeClick (postId) {
    this.props.addLike(postId)
  }

  onUnlikeClick (postId) {
    this.props.removeLike(postId)
  }

  findUserLike(likes) {
    const { auth } = this.props
    return likes.filter(like => like.user === auth.user.id).length > 0
  }

  render() {
    const { post, auth } = this.props
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img 
                className="rounded-circle d-none d-md-block" 
                src={post.avatar}
                alt={post.name} 
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button type="button" className="btn btn-light mr-1"
              onClick={this.onLikeClick.bind(this, post._id)}
            >
              <i className={classnames("fas fa-thumbs-up", {"text-info" : this.findUserLike(post.likes)} )}
              ></i>
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1"
              onClick={this.onUnlikeClick.bind(this, post._id)}
            >
              <i className="text-secondary fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {
              post.user === auth.user.id ? (
                <button className="btn btn-danger mr-1" type="button"
                  onClick={this.onDeleteClick.bind(this, post._id)}
                >
                  <i className="fas fa-times" />
                </button>
              )
              :null
            }
          </div>
        </div>
      </div>
    )
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)
