import "./profile.css";
import axios from "../../apis/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Select, Input, Button, Modal, Form } from "antd";
import React, { useState, useEffect, Component } from "react";
import moment from "moment";
import { Tag } from "antd";
import Swal from "sweetalert2";

function Profile() {
  const [profile, setProfile] = useState({});
  const [role, setRole] = useState([]);
 
  const format = "HH:mm";

  const getRole = async () => {
    await axios.get(`/api/role/allRole`).then(async (response) => {
      setRole(response.data);
      
    });
  };
  let options = [];
  role.forEach((role) => {
    options.push({
      label: role.name,
      value: role._id,
    });
  });

  const getProfile = async () => {
    await axios.get(`/api/profile/curProfile`).then(async (response) => {
      setProfile(response.data);
      let start = new Date();
      let end = new Date();
      response.data.scheduleArray.map((schedule) => {
        switch (schedule.weekday) {
          case "monday":
            start.setHours(schedule.start_time_hours);
            start.setMinutes(schedule.start_time_minutes);
            end.setHours(schedule.end_time_hours);
            end.setMinutes(schedule.end_time_minutes);
            setValue2([
              moment(start).format(format),
              moment(end).format(format),
            ]);
            // setValue2end([moment(end).format(format)])
            break;
          case "tuesday":
            start.setHours(schedule.start_time_hours);
            start.setMinutes(schedule.start_time_minutes);
            end.setHours(schedule.end_time_hours);
            end.setMinutes(schedule.end_time_minutes);
            setValue3([
              moment(start).format(format),
              moment(end).format(format),
            ]);
            break;
          case "wednesday":
            start.setHours(schedule.start_time_hours);
            start.setMinutes(schedule.start_time_minutes);
            end.setHours(schedule.end_time_hours);
            end.setMinutes(schedule.end_time_minutes);
            setValue4([
              moment(start).format(format),
              moment(end).format(format),
            ]);
            break;
          case "thursday":
            start.setHours(schedule.start_time_hours);
            start.setMinutes(schedule.start_time_minutes);
            end.setHours(schedule.end_time_hours);
            end.setMinutes(schedule.end_time_minutes);
            setValue5([
              moment(start).format(format),
              moment(end).format(format),
            ]);
            break;
          case "friday":
            start.setHours(schedule.start_time_hours);
            start.setMinutes(schedule.start_time_minutes);
            end.setHours(schedule.end_time_hours);
            end.setMinutes(schedule.end_time_minutes);
            setValue6([
              moment(start).format(format),
              moment(end).format(format),
            ]);
            break;
          case "saturday":
            start.setHours(schedule.start_time_hours);
            start.setMinutes(schedule.start_time_minutes);
            end.setHours(schedule.end_time_hours);
            end.setMinutes(schedule.end_time_minutes);
            setValue7([
              moment(start).format(format),
              moment(end).format(format),
            ]);
          case "sunday":
            start.setHours(schedule.start_time_hours);
            start.setMinutes(schedule.start_time_minutes);
            end.setHours(schedule.end_time_hours);
            end.setMinutes(schedule.end_time_minutes);
            setValuecn([
              moment(start).format(format),
              moment(end).format(format),
            ]);
            break;
          default:
        }
      });
    });
  };

  useEffect(() => {
    // console.log(empId);
    getRole();
    getProfile();
  }, []);

  const [value2, setValue2] = useState([]);
  const [value3, setValue3] = useState([]);
  const [value4, setValue4] = useState([]);
  const [value5, setValue5] = useState([]);
  const [value6, setValue6] = useState([]);
  const [value7, setValue7] = useState([]);
  const [valuecn, setValuecn] = useState([]);


  const formik = useFormik({
    initialValues: {
      fullname: profile.fullname,
      username: profile.username,
      phone: profile.phone,
      email: profile.email,
      address: profile.address,
      competence: profile.roleArray,
      schedule: profile.scheduleArray,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullname: Yup.string()
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
        .min(3, "Địa chỉ quá ngắn"),
    }),

    onSubmit: async (values) => {
      const {
        fullname,
        address,
        email,
        phone,
      } = values;
      try {
        const res = await axios({
          url: `api/profile/editProfile/${profile._id}`,
          method: "put",
          data: {
            fullname,
            phone,
            address,
            email,
          },
        });

        if (res.success) {
          disPlay();
        }
      } catch (err) {

      }
    },
  });
  const disPlay = () => {
    Swal.fire("Thành Công", `Cập nhật thành công`, "success");
  };
  const navigateHuy = () =>{
    window.location.href="http://localhost:3000"
    console.log(1)

  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 ml-24 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Thông tin cá nhân</h4>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Tên đăng nhập</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                    readOnly
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-md-12" style={{ marginTop: "10px" }}>
                  <label className="labels">Tên</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    id="fullname"
                    name="fullname"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.fullname && (
                    <p className="errorMsg"> {formik.errors.fullname} </p>
                  )}
                </div>

                <div className="col-md-12" style={{ marginTop: "10px" }}>
                  <label className="labels">Số điện thoại</label>
                  <Input
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
                <div className="col-md-12" style={{ marginTop: "10px" }}>
                  <label className="labels">Email</label>
                  <Input
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

                <div className="col-md-12" style={{ marginTop: "10px" }}>
                  <label className="labels">Địa chỉ</label>
                  <Input
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
                <div className="col-md-12" style={{ marginTop: "10px" }}>
                  <label className="labels" style={{display:"block", marginBottom:'10px'}}>Chức danh</label>
                  <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%"
                  }}
                  placeholder="Chọn chức vụ"
                  id="competence"
                  name="competence"
                  readOnly
                  value={formik.values.competence}
                  options={options}
                  disabled
                />
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
                  className="btn  profile-button m-3"
                  type="button"
                  style={{ backgroundColor: "#808080", color: "white" }}
                  onClick = {()=>{navigateHuy()}}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span style={{fontSize:"23px",fontWeight:"500"}}>Lịch làm việc</span>
              </div>
              <br />
              <table className="table table-striped table-hover col-12 col-sm-12">
                <thead>
                  <tr>
                    <th scope="col" className="col-3" style={{fontSize:"18px",fontWeight:"600",textAlign:"center"}}>
                      Lịch
                    </th>
                    <th scope="col" className="col-4" style={{fontSize:"15px",fontWeight:"600",textAlign:"center"}}>
                      Thời gian bắt đầu
                    </th>
                    <th scope="col" className="col-4" style={{fontSize:"15px",fontWeight:"600",textAlign:"center"}}>
                      Thời gian kết thúc
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{textAlign:"center"}}>
                    <th scope="row">Thứ 2</th>
                    {value2.length > 0 ? (
                      <>
                        <td>{value2[0]}</td>
                        <td>{value2[1]}</td>
                      </>
                    ) : (
                      <td colSpan="2">Nghỉ</td>
                    )}
                  </tr>
                  <tr style={{textAlign:"center"}}>
                    <th scope="row">Thứ 3</th>
                    {value3.length > 0 ? (
                      <>
                        <td>{value3[0]}</td>
                        <td>{value3[1]}</td>
                      </>
                    ) : (
                      <td colSpan="2">Nghỉ</td>
                    )}
                  </tr>
                  <tr style={{textAlign:"center"}}>
                    <th scope="row">Thứ 4</th>
                    {value4.length > 0 ? (
                      <>
                        <td>{value4[0]}</td>
                        <td>{value4[1]}</td>
                      </>
                    ) : (
                      <td colSpan="2">Nghỉ</td>
                    )}
                  </tr>
                  <tr style={{textAlign:"center"}}>
                    <th scope="row">Thứ 5</th>
                    {value5.length > 0 ? (
                      <>
                        <td>{value5[0]}</td>
                        <td>{value5[1]}</td>
                      </>
                    ) : (
                      <td colSpan="2">Nghỉ</td>
                    )}
                  </tr>
                  <tr style={{textAlign:"center"}}>
                    <th scope="row">Thứ 6</th>
                    {value6.length > 0 ? (
                      <>
                        <td>{value6[0]}</td>
                        <td>{value6[1]}</td>
                      </>
                    ) : (
                      <td colSpan="2">Nghỉ</td>
                    )}
                  </tr>
                  <tr style={{textAlign:"center"}}>
                    <th scope="row">Thứ 7</th>
                    {value7.length > 0 ? (
                      <>
                        <td>{value7[0]}</td>
                        <td>{value7[1]}</td>
                      </>
                    ) : (
                      <td colSpan="2">Nghỉ</td>
                    )}
                  </tr>
                  <tr style={{textAlign:"center"}}>
                    <th scope="row">Chủ Nhật</th>
                    {valuecn.length > 0 ? (
                      <>
                        <td>{valuecn[0]}</td>
                        <td>{valuecn[1]}</td>
                      </>
                    ) : (
                      <td colSpan="2">Nghỉ</td>
                    )}
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
