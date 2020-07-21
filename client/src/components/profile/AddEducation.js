import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import PropTypes from 'prop-types'
import { addEducation } from '../../actions/profile'

class AddEducation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCheck = this.onCheck.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name] : e.target.value })
  }
  
  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }
  
  onSubmit(e) {
    e.preventDefault()
    const { errors, disabled, ...profileEdu } = this.state
    this.props.addEducation(profileEdu, this.props.history)
    // console.log(profileExp)
    // console.log(this.props)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder = "* School Or Bootcamp"
                  name = "school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                
                <TextFieldGroup
                  placeholder = "* Degree Or Certificate"
                  name = "degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                
                <TextFieldGroup
                  placeholder = "Field Of Study"
                  name = "fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.onChange}
                  error={errors.fieldOfStudy}
                />
                

                <h6>From Date</h6>
                <TextFieldGroup
                  type = "date"
                  name = "from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  type = "date"
                  name = "to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />

                <div className="form-check mb-4">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="current" 
                    value={this.state.current} 
                    checked={this.state.current} 
                    onChange={this.onCheck} 
                    id="current" 
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name = "description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Some of your responsabilities, etc"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddEducation.propsTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))
