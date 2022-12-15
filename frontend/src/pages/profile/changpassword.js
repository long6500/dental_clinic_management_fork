import "./changpassword.css";
import React from "react";
// import axios from "../apis/api";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../apis/api";
function Changepassword() {
  
  const formik = useFormik({
    
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Không được trống")
        .matches(
          /^(?=.*[a-z])(?=.*)(?=.*\d)[a-z\d]{8,}$/,
          "Mật khẩu không đúng định dạng"
        ),

      newPassword: Yup.string()
        .required("Không được trống")
        .matches(
          /^(?=.*[a-z])(?=.*)(?=.*\d)[a-z\d]{8,}$/,
          "Mật khẩu không đúng định dạng"
        ),
        
      confirmPassword: Yup.string()
        .required("Không được trống")
        .matches(
          /^(?=.*[a-z])(?=.*)(?=.*\d)[a-z\d]{8,}$/,
          "Mật khẩu không đúng định dạng"
        )
        .oneOf([Yup.ref("newPassword")], "Không đúng với mật khẩu mới")
    }),

    onSubmit: async (values) => {
      const { password, newPassword, confirmPassword } = values;
      try {
        const res = await axios({
          url: "api/auth/changePassword",
          method: "Post",
          data: {
            password,
            newPassword,
            confirmPassword
          },
        });

        if (res.success) {
          disPlay();
          setTimeout(() => {
            localStorage.removeItem("token")
            window.location.href = "/login"
          }, 3000);
        }
      } catch (err) {
        Swal.fire(
          "Thất Bại",
          `Đổi mật khẩu thất bại`,
          "error"
        );
      }
    },
  });
  const disPlay = () => {
    Swal.fire(
      "Thành Công",
      `Đổi mật khẩu thành công`,
      "success"
    );
  }

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
                  type="text"
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
                  type="text"
                  className="input_forgotpass "
                  placeholder="Nhập mật khẩu mới"
                  id="newPassword"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.newPassword && (
                  <p className="errorMsg"> {formik.errors.newPassword} </p>
                )}
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4" required>
                  Nhập lại mật khẩu mới
                </label>
                <input
                  type="confirmPassword"
                  className="input_forgotpass "
                  placeholder="Xác nhận mật khẩu mới"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirmPassword && (
                  <p className="errorMsg"> {formik.errors.confirmPassword} </p>
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
