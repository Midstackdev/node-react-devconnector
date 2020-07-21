import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import ProfileActions from './ProfileActions'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  onDeleteClick(e) {
    console.log('del')
    this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if(profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link>
            </p>
            <ProfileActions />
          </div>
        )
      }
      else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You have not yet setup a profile, please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <p className="lead text-muted">{dashboardContent}</p>

              <div>
                <h4 className="mb-2">Experience Credentials</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Title</th>
                      <th>Years</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tech Guy Web Solutions</td>
                      <td>Senior Developer</td>
                      <td>
                        02-03-2009 - 01-02-2014
                      </td>
                      <td>
                        <button className="btn btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Traversy Media</td>
                      <td>Instructor & Developer</td>
                      <td>
                        02-03-2015 - Now
                      </td>
                      <td>
                        <button className="btn btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>


              <div>
                <h4 className="mb-2">Education Credentials</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>School</th>
                      <th>Degree</th>
                      <th>Years</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Northern Essex</td>
                      <td>Associates</td>
                      <td>
                        02-03-2007 - 01-02-2009
                      </td>
                      <td>
                        <button className="btn btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{marginBottom: '60px'}}>
                <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
