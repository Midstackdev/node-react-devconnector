import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createProfile } from '../../actions/profile'

class CreateProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      githubUsername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedIn: '',
      youtube: '',
      intagram: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const { errors, displaySocialInputs, ...profileData } = this.state
    // console.log(profileData)
    this.props.createProfile(profileData, this.props.history)
  }
  render() {
    const { errors, displaySocialInputs } = this.state

    let socialInputs

    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            type="text"
            className="form-control form-control-lg"
            placeholder="Twitter Profile URL"
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
            icon="fab fa-twitter"
          />

          <InputGroup
            type="text"
            className="form-control form-control-lg"
            placeholder="Facebook Profile URL"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
            icon="fab fa-facebook"
          />

          <InputGroup
            type="text"
            className="form-control form-control-lg"
            placeholder="LinkedIn Profile URL"
            name="linkedIn"
            value={this.state.linkedIn}
            onChange={this.onChange}
            error={errors.linkedIn}
            icon="fab fa-linkedin"
          />

          <InputGroup
            type="text"
            className="form-control form-control-lg"
            placeholder="Youtube Channnel URL"
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
            icon="fab fa-youtube"
          />

          <InputGroup
            type="text"
            className="form-control form-control-lg"
            placeholder="Instagram Page URL"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
            icon="fab fa-instagram"
          />
        </div>
      )
    }
    const options = [
      {label: '* Select Professional Status', value: 0},
      {label: 'Developer', value: 'developer'},
      {label: 'Junior Developer', value: 'junior-developer'},
      {label: 'Senior Developer', value: 'senior-developer'},
      {label: 'Manager', value: 'manager'},
      {label: 'Student or Tearning', value: 'student-or-learning'},
      {label: 'Instructor or Teacher', value: 'instructor-or-teacher'},
      {label: 'Intern', value: 'intern'},
      {label: 'Other', value: 'other'},
    ]
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname,"
                />

                <SelectListGroup
                  className="form-control form-control-lg"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career,"
                />

                <TextFieldGroup
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own or a company website"
                />

                <TextFieldGroup
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City & state suggested (eg. Boston, MA)"
                />

                <TextFieldGroup
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />

                <TextFieldGroup
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Github Username"
                  name="githubUsername"
                  value={this.state.githubUsername}
                  onChange={this.onChange}
                  error={errors.githubUsername}
                  info="If you want your latest repos and a Github link, include your username"
                />

                <TextAreaFieldGroup
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: Proptypes.object.isRequired,
  errors: Proptypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))
