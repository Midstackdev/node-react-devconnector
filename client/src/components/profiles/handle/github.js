import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class ProfileGithub extends Component {

  constructor(props) {
    super(props)
    this.state = {
      clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }

  componentDidMount() {
    const { username } = this.props
    const { count, sort } = this.state

    axios.get(` https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}`)
    .then(res => this.setState({ repos: res.data }))
    .catch(err => console.log(err))
  }

  render() {
    const { repos } = this.state

    const repoItems = repos.map(repo => (
      <div className="card card-body mb-2" key={repo.id}>
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer"> 
                {repo.name}
              </a>
            </h4>
            <p>{ repo.description }</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub
