import "./changpassword.css";
import React from "react";
// import axios from "../apis/api";

import { useFormik } from "formik";
import * as Yup from "yup";

function Changepassword() {
  
  const formik = useFormik({
    
    initialValues: {
      password: "",
      newpassword: "",
      confirmpassword: "",
    },
    
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Không được trống")
        .matches(
          /^(?=.*[a-z])(?=.*)(?=.*\d)[a-z\d]{8,}$/,
          "Mật khẩu không đúng định dạng"
        ),

      newpassword: Yup.string()
        .required("Không được trống")
        .matches(
          /^(?=.*[a-z])(?=.*)(?=.*\d)[a-z\d]{8,}$/,
          "Mật khẩu không đúng định dạng"
        )
        .oneOf([Yup.ref("password")], "Mật khẩu mới không được trùng với mật khẩu cũ"),
      confirmpassword: Yup.string()
        .required("Không được trống")
        .matches(
          /^(?=.*[a-z])(?=.*)(?=.*\d)[a-z\d]{8,}$/,
          "Mật khẩu không đúng định dạng"
        )
        .oneOf([Yup.ref("newpassword")], "Không đúng với mật khẩu mới")
    }),

    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={formik.handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <p
                  className="text-center fw-bold mx-3 mb-0"
                  style={{ fontSize: "23px" }}
                >
                  Đổi mật khẩu
                </p>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Mật khẩu cũ
                </label>
                <input
                  className="input_forgotpass "
                  placeholder="Nhập mật khẩu cũ"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                />
                {formik.errors.password && (
                  <p className="errorMsg"> {formik.errors.password} </p>
                )}
              </div>
              {/* Password input */}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4" required>
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  className="input_forgotpass "
                  placeholder="Nhập mật khẩu mới"
                  id="newpassword"
                  name="newpassword"
                  value={formik.values.newpassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.newpassword && (
                  <p className="errorMsg"> {formik.errors.newpassword} </p>
                )}
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4" required>
                  Nhập lại mật khẩu mới
                </label>
                <input
                  type="password"
                  className="input_forgotpass "
                  placeholder="Xác nhận mật khẩu mới"
                  id="confirmpassword"
                  name="confirmpassword"
                  value={formik.values.confirmpassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && (
                  <p className="errorMsg"> {formik.errors.confirmpassword} </p>
                )}
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="onSubmit"
                  className="btn btn-primary btn-lg"
                  href="/homepage"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
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

export default Changepassword;
