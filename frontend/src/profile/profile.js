import "./profile.css";
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Profile() {
  const [name, setname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [email, setemail] = React.useState("");
  const [address, setaddress] = React.useState("");

  // const [message, setMessage] = useState('');
  // const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      phone: "",
      email: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Không được trống")
        .min(2, "Phải dài hơn 2 kí tự"),
      email: Yup.string()
        .required("Không được trống")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email sai định dạng"),
      phone: Yup.string()
        .required("Không được trống")
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Số điện thoại phải 10 chữ số"
        ),
      address: Yup.string()
        .required("Không được trống")
        .max(30, "Địa chỉ quá dài")
        .min(3, "Địa chỉ quá ngắn"),
    }),

    onSubmit: (values) => {
      window.alert("Lưu thành công");
      console.log(values);
    },
  });
  console.log(formik.errors.phone);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-5 ml-24 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Thông tin cá nhân</h4>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && (
                    <p className="errorMsg"> {formik.errors.name} </p>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels">Tên đăng nhập</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                    readOnly="true"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone && (
                    <p className="errorMsg"> {formik.errors.phone} </p>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && (
                    <p className="errorMsg"> {formik.errors.email} </p>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels">Chức danh</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    readOnly="true"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address && (
                    <p className="errorMsg"> {formik.errors.address} </p>
                  )}
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button m-3 "
                  type="submit"
                  data-toggle="modal" 
                  data-target="#exampleModal"
                >
                  Lưu
                </button>
                <button
                  className="btn btn-danger profile-button m-3"
                  type="button"
                
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Lịch làm việc</span>
              </div>
              <br />
              <table class="table table-striped table-hover col-12 col-sm-12">
                <thead>
                  <tr>
                    <th scope="col" class="col-3">
                      Lịch
                    </th>
                    <th scope="col" class="col-4">
                      Thời gian bắt đầu
                    </th>
                    <th scope="col" class="col-4">
                      Thời gian kết thúc
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Thứ 2</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <th scope="row">Thứ 3</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <th scope="row">Thứ 4</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <th scope="row">Thứ 5</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <th scope="row">Thứ 6</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <th scope="row">Thứ 7</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <th scope="row">Chủ Nhật</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>

      
    </form>
  );
}

export default Profile;
// ten,sdt,email,chuc danh,dia chi,lich lam viec