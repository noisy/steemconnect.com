import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Loading from '../widgets/Loading';
import Modal from '../widgets/Modal';
import { signup, login } from './authAction';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signUp = (event) => {
    event.preventDefault();
    this.props.signup(this.username.value, this.passwordOrWif.value);
  };

  login = (event) => {
    event.preventDefault();
    this.props.login(this.username.value, this.passwordOrWif.value).then(() => {
      window.location = '/';
    });
  };

  render() {
    const { isFetching, errorMessage, success } = this.props.auth;

    return (
      <Modal>
        <div className="dialog">
          <h3 className="m-4">Sign Up</h3>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="icon icon-md material-icons">perm_identity</i></span>
              <input type="text" placeholder="Username" className="form-control" ref={(c) => { this.username = c; } } />
            </div>
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="icon icon-md material-icons">lock_outline</i></span>
              <input autoFocus type="password" placeholder="Password" className="form-control" ref={(c) => { this.passwordOrWif = c; } } />
            </div>
            {errorMessage &&
              <ul className="errorMessages p-3">
                <li>{errorMessage}</li>
              </ul>}
            {success &&
              <ul className="p-3">
                <li>Signup successful</li>
              </ul>
            }
            <fieldset className="form-group m-0">
              {!success && <button className="btn btn-success form-submit" onClick={this.signUp}>
                {isFetching ? <Loading color="white" /> : 'Sign Up'}</button>}
              {success && <button className="btn btn-success form-submit" onClick={this.login}>
                {isFetching ? <Loading color="white" /> : 'Login'}</button>}
            </fieldset>
          </form>
        </div>
        <div className="my-4">
          <p>Have an account? <Link to="/login">Log in</Link></p>
        </div>
      </Modal>
    );
  }
}

SignUp.propTypes = {
  auth: PropTypes.shape({
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    success: PropTypes.bool,
  }),
  signup: PropTypes.func,
  login: PropTypes.func,
  location: PropTypes.shape({}),
};

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(signup, dispatch),
  login: bindActionCreators(login, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
