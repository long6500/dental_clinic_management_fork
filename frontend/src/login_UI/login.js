import "./login.css";
import React from "react";
import axios from "axios";
import * as mdb from "mdb-ui-kit"; // lib
import { Input } from "mdb-ui-kit"; // module
import { useNavigate } from "react-router";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [sucess, setsucess] = React.useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setpassword(value);
  };
  const submitForm = async (e) => {
    setError("");
    setsucess("");
    e.preventDefault();
    // navigate("/");
    window.location.href = "/medicine";
    try {
      const res = await axios({
        url: "",
        method: "POST",
        data: { username, password },
      });

      if (res.data.success) {
        const user = {
          username: res.data.data.username,
          _id: res.data.data._id,
        };
        setsucess("Login successful");
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/";
      } else {
        setError(res.data.data);
      }
    } catch (err) {
      setError("loi roi");
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={submitForm}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Login</p>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  onChange={onChangeUsername}
                  placeholder="Enter a valid email address"
                  required
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
              </div>
              {/* Password input */}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  onChange={onChangePassword}
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
                <label className="form-label" htmlFor="form3Example4" required>
                  Password
                </label>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    defaultValue
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick ={submitForm}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
