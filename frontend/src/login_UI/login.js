import "./login.css";
import React from "react";
import axios from "../apis/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../components/hooks/useAuth";
import { useNavigate } from "react-router";
function Login() {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
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

    onSubmit: async (values) => {
      console.log(values);
      const { username, password } = values;
      try {
        console.log({ username, password });
        const res = await axios({
          url: "/api/auth/login",
          method: "post",
          data: {
            username,
            password,
          },
        });

        if (res.success) {
          login({
            _id: res.id,
            token: res.token,
          });
        }
      } catch (err) {
        alert(err);
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
            <div className="col-right">
      <div className="login-form">
      <h2>Đăng Nhập</h2>
        <form>
          <div className="login_top">
          <label>Tên đăng nhập</label>
            <input type="text" placeholder="Username or Email" id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}  />
          
          {formik.errors.username && (
            <p className="errorMsg"> {formik.errors.username} </p>
          )}
          </div>
           
          <div className="login_mide">
          <label>Mật khẩu</label>
            <input type="password" placeholder="Password"  id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}/>
          
          {formik.errors.password && (
            <p className="errorMsg"> {formik.errors.password} </p>
          )}
          </div>
           

          <div className="login_bottom">

           <button className="btnlogin" type="submit"   >Đăng nhập</button>
            <a href="/forgotpassword">Forget Password?</a>
          
          </div>
          
           

        </form>
      </div>
    </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
