import React, { useState, useEffect, Component } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../apis/api";
import { Select, Input, Button, Modal, Form } from "antd";
import { FaPlusCircle } from "react-icons/fa";
import { Space, TimePicker } from "antd";
import { Checkbox } from "antd";
import dayjs from "dayjs";
import { FaRedoAlt, FaEdit } from "react-icons/fa";
const { TextArea } = Input;
function ModaladdStaff(props) {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState([]);
  const [open, setOpen] = useState(false);

  const [disabled2, setDisabled2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);
  const [disabled4, setDisabled4] = useState(false);
  const [disabled5, setDisabled5] = useState(false);
  const [disabled6, setDisabled6] = useState(false);
  const [disabled7, setDisabled7] = useState(false);
  const [disabledcn, setDisabledcn] = useState(false);
  const format = "HH:mm";

  const toggleDisablet2 = () => {
    setDisabled2(!disabled2);
  };
  const toggleDisablet3 = () => {
    setDisabled3(!disabled3);
  };
  const toggleDisablet4 = () => {
    setDisabled4(!disabled4);
  };
  const toggleDisablet5 = () => {
    setDisabled5(!disabled5);
  };
  const toggleDisablet6 = () => {
    setDisabled6(!disabled6);
  };
  const toggleDisablet7 = () => {
    setDisabled7(!disabled7);
  };
  const toggleDisabletcn = () => {
    setDisabledcn(!disabledcn);
  };

  let options = [];
  const getRole = async () => {
    await axios.get(`/api/role/`).then(async (response) => {
      setRole(response.data);
    });
  };
  role.forEach((role) => {
    options.push({
      label: role.name,
      value: role._id,
    });
  });
  useEffect(() => {
    getRole();
  }, []);

  const reset = () =>{
    formik.values.fullname ="";
    formik.values.address ="";
    formik.values.phone ="";
    formik.values.competence= [];
    formik.values.email ="";
    formik.values.numberOfWorkdays = 0;
    formik.values.salary =0;
    formik.values.schedule =[];
    console.log(formik.values.competence)
  }

  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      competence: [],
      address: "",
      email: "",
      numberOfWorkdays: 0,
      salary: 0,
      schedule: [],
    },
    validationSchema: Yup.object({
      fullname: Yup.string().trim()
        .required("Không được trống")
        .min(2, "Phải dài hơn 2 kí tự"),
      phone: Yup.string().trim()
        .required("Không được trống")
        .typeError("Không phải là dạng số")
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Số điện thoại phải chữ số và có 10 số"
        )
        .test(
          "Số điện thoại độc nhất",
          "Số điện thoại đang được sử dụng", // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              axios
                .get(`/api/profile/checkPhone/${value}`)
                .then((res) => {
                  if (res.success === 1) resolve(true);
                  else resolve(false);
                })
                .catch((error) => {
                  if (
                    error.response.data.content === "Số điện thoại đã bị lấy"
                  ) {
                    resolve(false);
                  }
                });
            });
          }
        ),
      //     openTime: yup.date().required(validateMessage.required),
      // closeTime: yup.date().min(yup.ref('openTime'), 'Giờ đóng max phải lớn hơn giờ mở').required(validateMessage.required),
      competence: Yup.array()
        .required("Không được trống")
        .min(1, "Không được trống"),
      schedule: Yup.array()
        .required("Không được trống")
        .min(1, "Không được trống"),
      address: Yup.string().trim(),
      email: Yup.string().trim()
        .required("Không được trống")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email sai định dạng")
        .test(
          "Email độc nhất",
          "Email đang được sử dụng", // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              axios
                .get(`/api/profile/checkEmail/${value}`)
                .then((res) => {
                  if (res.success === 1) resolve(true);
                  else resolve(false);
                })
                .catch((error) => {
                  if (error.response.data.content === "Email đã bị lấy") {
                    resolve(false);
                  }
                });
            });
          }
        ),
      numberOfWorkdays: Yup.number()
        .typeError("Không phải là dạng số")
        .required("Không được để trống")
        .positive("Phải là số dương")
        .max(30, "Không được quá 30 ngày công")
        .integer("Phải là số nguyên dương"),
      salary: Yup.number()
        .typeError("Không phải là dạng số")
        .required("Không được để trống")
        .positive("Phải là số dương")
        .integer("Phải là số nguyên dương"),
    }),
 

    onSubmit: async (values) => {
      const {
        fullname,
        phone,
        competence,
        address,
        email,
        numberOfWorkdays,
        salary,
        schedule,
      } = values;
      console.log(values);
      console.log(formik.values.competence )
      try {
        const res = await axios({
          url: "/api/profile",
          method: "post",
          data: {
            fullname,
            phone,
            role: competence,
            address,
            email,
            workingDays: numberOfWorkdays,
            salary,
            schedule,
          },
        });

        if (res.success) {
          setTimeout(() => {
            reset();
           
            // setLoading(false);
            // setOpen(false);
          }, 3000);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  function findIndexByProperty(data, key, value) {
    for (var i = 0; i < data.length; i++) {
      if (data[i][key] === value) {
        return i;
      }
    }
    return -1;
  }

  const pushSchedule = (e, weekday) => {
    console.log(e)
    let scheduleTemp = {
      start_time_hours: e[0]._d.getHours(),
      start_time_minutes: e[0]._d.getMinutes(),
      end_time_hours: e[1]._d.getHours(),
      end_time_minutes: e[1]._d.getMinutes(),
      weekday: weekday,
    };
    const index = findIndexByProperty(
      formik.values.schedule,
      "weekday",
      weekday
    );
    if(index>-1){
      formik.values.schedule[index] = scheduleTemp;
    }else{
      formik.values.schedule.push(scheduleTemp);
    }
    console.log(formik.values.schedule)
  };

  const handleOk = () => {
    formik.handleSubmit();
    if(Object.keys(formik.errors).length !== 0) return;
    console.log(Object.keys(formik.errors).length)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  

  return (
    <>
      <Button
        variant="success"
        onClick={showModal}
        style={{ marginRight: "20px", backgroundColor: "#139C49" ,color:"white"}}
      >
        <FaPlusCircle></FaPlusCircle> Thêm nhân viên
      </Button>

      <Modal
        title="Thêm nhân viên"
        open={open}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel} style={{ backgroundColor: "#808080",borderRadius:"5px"}}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
            htmlType="submit"
            style={{borderRadius:"5px"}}
          >
            Lưu lại
          </Button>,
        ]}
        // footer={null}
      >
        <Form form = {form} >
          <div className="container">
            <div className="row">
              
              <div
                className="col-6 form-group "
                style={{ marginBottom: "20px" }}
              >
                <label>Tên nhân viên</label>
                <Input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                />

                {formik.errors.fullname && (
                  <div className="errorMsg"> {formik.errors.fullname} </div>
                )}
              </div>
              <div className="col-6 form-group">
                <label>Điện thoại</label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />

                {formik.errors.phone && (
                  <div className="errorMsg"> {formik.errors.phone} </div>
                )}
              </div>
              <div className="col-6 form-group">
                <label>Chức vụ</label>
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Chọn chức vụ"
                  id="competence"
                  name="competence"
                  onChange={(value) => {
                    formik.setFieldValue("competence", value);
                  }}
                  value={formik.values.competence}
                  options={options}
                />

                {formik.errors.competence && (
                  <div className="errorMsg"> {formik.errors.competence} </div>
                )}
              </div>
              <div
                className="col-6 form-group"
                style={{ marginBottom: "20px" }}
              >
                <label>Email</label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />

                {formik.errors.email && (
                  <div className="errorMsg"> {formik.errors.email} </div>
                )}
              </div>
              <div className="col-12 form-group">
                <label>Địa chỉ</label>
                <TextArea
                  rows={2}
                  type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-6 form-group" style={{ marginTop: "20px" }}>
                <label>Số ngày công</label>
                <Input
                  type="text"
                  id="numberOfWorkdays"
                  name="numberOfWorkdays"
                  value={formik.values.numberOfWorkdays}
                  onChange={formik.handleChange}
                />

                {formik.errors.numberOfWorkdays && (
                  <div className="errorMsg">
                
                    {formik.errors.numberOfWorkdays}
                  </div>
                )}
              </div>
              <div className="col-6 form-group" style={{ marginTop: "20px" }}>
                <label>Lương</label>
                <Input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                />

                {formik.errors.salary && (
                  <div className="errorMsg"> {formik.errors.salary} </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 container">
            
             {/* {formik.errors.schedule && (
                  <div className="errorMsg"> {formik.errors.schedule} </div>
                )} */}
            <div className="row" style={{ display: "flex", marginTop: "10px" }}>
            <div className="row" style={{marginBottom:"15px"}}>
                <div className="col-md-2" style={{ textAlign: "center" }}>
                <span className="font-medium text-lg" style={{ fontSize: "15px" }}>
              Lịch làm việc:
            </span>
                </div>
                <div className="col-md-2" style={{ textAlign: "end" }}>
                </div>
                <div className="col-md-8" style={{ textAlign: "center" }}>
                {formik.errors.schedule && (
                  <div className="errorMsg"> {formik.errors.schedule} </div>
                )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  <p className="font-weight-bold">Thứ 2:</p>
                </div>
                <div className="col-md-2" style={{ textAlign: "end" }}>
                  <Checkbox onClick={toggleDisablet2}></Checkbox>
                </div>
                <div className="col-md-8" style={{ textAlign: "center" }}>
                  <Space direction="vertical">
                    <TimePicker.RangePicker
                      size="large"
                      TimePicker
                      id="schedule"
                      name="schedule"
                      defaultValue={dayjs("12:08", format)}
                      disabled={!disabled2}
                      status="success"
                      format={format}
                      onChange={(e) => {
                        pushSchedule(e, "monday");
                      }}
                    />
                  </Space>
                </div>
              </div>
            </div>
            <div className="row" style={{ display: "flex", marginTop: "10px" }}>
              <div className="row">
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  <p className="font-weight-bold">Thứ 3:</p>
                </div>
                <div className="col-md-2" style={{ textAlign: "end" }}>
                  <Checkbox onClick={toggleDisablet3}></Checkbox>
                </div>
                <div className="col-md-8" style={{ textAlign: "center" }}>
                  <Space direction="vertical">
                    <TimePicker.RangePicker
                      disabled={!disabled3}
                      size="large"
                      status="success"
                      id="schedule"
                      name="schedule"
                      TimePicker
                      defaultValue={dayjs("12:08", format)}
                      format={format}
                      onChange={(e) => {
                        pushSchedule(e, "tuesday");
                      }}
                    />
                  </Space>
                </div>
              </div>
            </div>
            <div className="row" style={{ display: "flex", marginTop: "10px" }}>
              <div className="row">
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  <p className="font-weight-bold">Thứ 4:</p>
                </div>
                <div className="col-md-2" style={{ textAlign: "end" }}>
                  <Checkbox onClick={toggleDisablet4}></Checkbox>
                </div>
                <div className="col-md-8" style={{ textAlign: "center" }}>
                  <Space direction="vertical">
                    <TimePicker.RangePicker
                      size="large"
                      disabled={!disabled4}
                      status="success"
                      id="schedule"
                      name="schedule"
                      TimePicker
                      defaultValue={dayjs("12:08", format)}
                      format={format}
                      onChange={(e) => {
                        pushSchedule(e, "tednesday");
                      }}
                    />
                  </Space>
                </div>
              </div>
            </div>
            <div className="row" style={{ display: "flex", marginTop: "10px" }}>
              <div className="row">
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  <p className="font-weight-bold">Thứ 5:</p>
                </div>
                <div className="col-md-2" style={{ textAlign: "end" }}>
                  <Checkbox onClick={toggleDisablet5}></Checkbox>
                </div>
                <div className="col-md-8" style={{ textAlign: "center" }}>
                  <Space direction="vertical">
                    <TimePicker.RangePicker
                      size="large"
                      disabled={!disabled5}
                      status="success"
                      id="schedule"
                      name="schedule"
                      TimePicker
                      defaultValue={dayjs("12:08", format)}
                      format={format}
                      onChange={(e) => {
                        pushSchedule(e, "thursday");
                      }}
                    />
                  </Space>
                </div>
              </div>
            </div>
            <div className="row" style={{ display: "flex", marginTop: "10px" }}>
              <div className="row">
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  <p className="font-weight-bold">Thứ 6:</p>
                </div>
                <div className="col-md-2" style={{ textAlign: "end" }}>
                  <Checkbox onClick={toggleDisablet6}></Checkbox>
                </div>
                <div className="col-md-8" style={{ textAlign: "center" }}>
                  <Space direction="vertical">
                    <TimePicker.RangePicker
                      size="large"
                      disabled={!disabled6}
                      status="success"
                      id="schedule"
                      name="schedule"
                      TimePicker
                      // value={formik.values.schedule}
                      defaultValue={dayjs("12:08", format)}
                      format={format}
                      onChange={(e) => {
                        pushSchedule(e, "friday");
                      }}
                    />
                  </Space>
                </div>
              </div>
            </div>
            <div className="row" style={{ display: "flex", marginTop: "10px" }}>
              <div className="row">
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  <p className="font-weight-bold">Thứ 7:</p>
                </div>
                <div className="col-md-2" style={{ textAlign: "end" }}>
                  <Checkbox onClick={toggleDisablet7}></Checkbox>
                </div>
                <div className="col-md-8" style={{ textAlign: "center" }}>
                  <Space direction="vertical">
                    <TimePicker.RangePicker
                      size="large"
                      disabled={!disabled7}
                      status="success"
                      id="schedule"
                      name="schedule"
                      TimePicker
                      defaultValue={dayjs("12:08", format)}
                      format={format}
                      onChange={(e) => {
                        pushSchedule(e, "saturday");
                      }}
                    />
                  </Space>
                </div>
              </div>
            </div>
            <div className="row" style={{ display: "flex", marginTop: "10px" }}>
              <div className="row">
                <div className="col-md-2" style={{ textAlign: "center" }}>
                  <p className="font-weight-bold">Chủ Nhật:</p>
                </div>
                <div className="col-md-2" style={{ textAlign: "end" }}>
                  <Checkbox onClick={toggleDisabletcn}></Checkbox>
                </div>
                <div className="col-md-8" style={{ textAlign: "center" }}>
                  <Space direction="vertical">
                    <TimePicker.RangePicker
                      size="large"
                      disabled={!disabledcn}
                      status="success"
                      id="schedule"
                      name="schedule"
                      TimePicker
                      defaultValue={dayjs("12:08", format)}
                      format={format}
                      onChange={(e) => {
                        pushSchedule(e, "sunday");
                      }}
                    />
                  </Space>
                </div>
              </div>
            </div>
            <div className="footer" style={{ marginBottom: "20px" }}>
              {/* <Button
                htmlType="submit"
                loading={loading}
                type="primary"
                style={{ float: "right" }}
                key="submit"
                onClick={handleOk}
                form="myForm"
              >
                Xác nhận
              </Button>
              <Button
                style={{
                  float: "right",
                  marginRight: "10px",
                  backgroundColor: "gray",
                }}
                onClick={handleCancel}
                key="back"
              >
                Hủy
              </Button> */}
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default ModaladdStaff;
