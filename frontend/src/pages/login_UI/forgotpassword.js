import "./forgotpassword.css";
import React from "react";
import axios from "../../apis/api";
import { useFormik } from "formik";
import * as Yup from "yup";

function Forgotpassword() {
  
  const [error, setError] = React.useState("");

  const formik =  useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
        email: Yup.string()
        .required("Không được trống")
        .min(2, "Phải dài hơn 2 kí tự"),
     
    }),

   onSubmit: async  (values) => {
    console.log(values)
    const { username } = values;
    try {
      console.log({ username})
      const res = await axios({
        url: '',
        method: 'Get',
        data: {
          username
          
        }
      });

      if (res.data.success) {
          const user = {
              username: res.data.data.username,
              _id: res.data.data._id,
              
          }
          setError("Successfull")
          localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.log("sai mk")
      }

  } catch (err) {
    console.log("sai")
    setError(err);
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
                <p className="text-center fw-bold mx-3 mb-0">Quên Mật Khẩu</p>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
              <label>Tên đăng nhập</label><br></br>
                <input
                  className="input_forgotpass "
                  placeholder="Nhập tên đăng nhập"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
               {formik.errors.email && (
                  <p className="errorMsg"> {formik.errors.email} </p>
                )}
               
              </div>
              {/* Password input */}
             
              
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="onSubmit"
                  className="btn btn-primary btn-lg"
                  href="/homepage"
                  styleFor={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Xác Nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forgotpassword;