import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "./index.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    redirectToHome: false, // New state to control redirection
  };

  onSubmitSuccess = jwtToken => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    this.setState({ redirectToHome: true });
  };

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  onSubmitForm = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onEnterUsername = event => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { showSubmitError, errorMsg, redirectToHome } = this.state;
    if (redirectToHome) {
      return <Navigate to="/" />;
    }

    return (
      <div className="jobby-app-container">
        <div className="card-container">
            <img src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png" alt="logo-image" className="website-logo"/>

          <form className="form-container" onSubmit={this.onSubmitForm}>
          <label className="label" htmlFor="userName">
          Username
        </label>
            <input
              type="text"
              placeholder="Username"
              onChange={this.onEnterUsername}
              className="user-input"

            />
             <label className="label" htmlFor="userName">
          Password
        </label>
            <input
              type="password"
              placeholder="Password"
              onChange={this.onChangePassword}
              className="user-input"
            />
            <button type="submit" className="login-button">Login</button>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
