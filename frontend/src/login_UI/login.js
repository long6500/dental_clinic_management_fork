import "./login.css";
import React from "react";
import axios from "../apis/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
function Login() {
  
  const [error, setError] = React.useState("");

  const formik =  useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Không được trống")
        .min(2, "Phải dài hơn 2 kí tự"),
      password: Yup.string()
        .required("Không được trống")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Mật khẩu không đúng định dạng"
        ),
    }),

   onSubmit: async  (values) => {
    console.log(values)
    const { username, password } = values;
    try {
      console.log({ username, password })
      const res = await axios({
        url: '/api/auth/login',
        method: 'post',
        data: {
          username,
          password
        }
      });
        
          
      if (res.success) {
          const user = {
              _id: res.id,
              token:res.token,
          }
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem("token",res.data.token);
          window.location.href = '/homepage'
      } 

  } catch (err) {
    
    alert(err)
  }
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Đăng Nhập</p>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
               {formik.errors.username && (
                  <p className="errorMsg"> {formik.errors.username} </p>
                )}
                <label className="form-label" htmlFor="form3Example3">
                  Email
                </label>
              </div>
              {/* Password input */}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && (
                  <p className="errorMsg"> {formik.errors.password} </p>
                )}
                <label className="form-label" htmlFor="form3Example4" required>
                  Mật Khẩu
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
                    Nhớ mật khẩu
                  </label>
                </div>
                <a href="/forgotpassword" className="text-body">
                  Quên mật khẩu
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="onSubmit"
                  className="btn btn-primary btn-lg"
                  href="/homepage"
                  styleFor={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Đăng Nhập
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