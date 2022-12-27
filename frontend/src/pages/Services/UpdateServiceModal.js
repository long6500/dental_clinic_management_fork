import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import serviceProcessor from "../../apis/serviceProcessor";
import axios from "../../apis/api";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import { FaTrashAlt } from "react-icons/fa";
import medicineProcessor from "../../apis/medicineProcessor";
import { useSelector } from "react-redux";
import UploadAndDisplayImage from "../../components/uploadImage";
import Button from "react-bootstrap/Button";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Select,
  // Modal,
  Button as Butt,
  Input,
  Form as FormAntd,
  InputNumber,
  message,
  Typography,
} from "antd";
import Swal from "sweetalert2";

const UpdateServiceModal = ({
  userB,
  serviceId,
  isVisible,
  closeModal,
  loadData,
}) => {
  const { Text, Link } = Typography;

  const [form] = FormAntd.useForm();
  const [temp, setTemp] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [disabledinPut, setDisabledinPut] = useState(false);
  const [isShowSuggestion, setIsShowSuggestion] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [consumableUiList, setConsumableUiList] = useState([]);
  const [prescriptionList, setPrescriptionList] = useState([]);

  const [errorList, setErrorList] = useState([]);
  const [errorListPre, setErrorListPre] = useState([]);

  const [currService, setCurrService] = useState({});
  // const meds = useSelector((state) => state.med.medicine);
  const [meds, setMeds] = useState([]);

  const getMedicine = async () => {
    await axios.get(`/api/medicine/activeMedicine`).then((response) => {
      setMeds(response.data);
      //get Names from list
      setSuggestionList([...response.data.map((i) => i.name)]);
    });
  };

  const resetData = () => {
    setCurrService({
      _id: "",
      name: "",
      note: "",
      price: { $numberDecimal: -1 },
      status: true,
      time: 0,
      imageUrl: "",
      consumableArray: [],
      prescriptionArray: [],
    });
  };

  const getService = async () => {
    // serviceId &&
    if (serviceId) {
      await axios
        .get(`api/service/${serviceId}`)
        .then((response) => {
          console.log(response.data);
          setCurrService(response.data);
          // setCurrService({ ...currService, ...response.data.data });
          console.log(response.data.consumableArray);
          // setConsumableUiList(response.data.consumableArray);
          setConsumableUiList([
            ...response.data.consumableArray.map((item) => [
              item.medicineId,
              [item.medicineName],
              item.medicineQuantity,
              item.unit,
              item.medicineUnit,
              item.numberOfUses,
            ]),
          ]);

          setErrorList([
            ...response.data.consumableArray.map((item) => [
              "",
              "",
              "",
              "",
              "",
              "",
            ]),
          ]);

          setPrescriptionList([
            ...response.data.prescriptionArray.map((item) => [
              item.medicineId,
              [item.medicineName],
              item.medicineQuantity,
              item.unit,
              item.medicineUnit,
              item.quantity,
              item.usage,
            ]),
          ]);

          setErrorListPre([
            ...response.data.prescriptionArray.map((item) => [
              "",
              "",
              "",
              "",
              "",
              "",
              "",
            ]),
          ]);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    }
  };

  // const loadDataMed = async () => {
  //   medicineProcessor.getAll();
  //   handleClose();
  // };

  useEffect(() => {
    if (serviceId) {
      // form.resetFields();
      getService();
      getMedicine();
      getPermission("Quản lý dịch vụ");
    }
  }, [serviceId, isVisible]);

  const fillData = (e, rowIndex) => {
    const searchResult = meds.find((item) => item.name === e[0]);

    if (searchResult) {
      consumableUiList[rowIndex][0] = searchResult._id;
      consumableUiList[rowIndex][2] = searchResult.quantity;
      consumableUiList[rowIndex][3] = searchResult.unit;
      consumableUiList[rowIndex][4] = searchResult.effect;
      setConsumableUiList(consumableUiList);
    } else {
      consumableUiList[rowIndex][0] = "";
      consumableUiList[rowIndex][2] = "";
      consumableUiList[rowIndex][3] = "";
      consumableUiList[rowIndex][4] = "";
    }
  };

  const fillDataPre = (e, rowIndex) => {
    const searchResult = meds.find((item) => item.name === e[0]);

    if (searchResult) {
      prescriptionList[rowIndex][0] = searchResult._id;
      prescriptionList[rowIndex][2] = searchResult.quantity;
      prescriptionList[rowIndex][3] = searchResult.unit;
      prescriptionList[rowIndex][4] = searchResult.effect;
      setPrescriptionList(prescriptionList);
    } else {
      prescriptionList[rowIndex][0] = "";
      prescriptionList[rowIndex][2] = "";
      prescriptionList[rowIndex][3] = "";
      prescriptionList[rowIndex][4] = "";
    }
  };

  const formik = useFormik({
    initialValues: {
      name: currService.name,
      imageUrl: currService.imageUrl,
      time: currService.time,
      price: currService.price?.$numberDecimal,
      note: currService.note,
      consumableArray: consumableUiList,
      // prescription: []
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Bắt buộc").min(4, "Ít nhất 4 kí tự trở lên"),
      imageUrl: Yup.mixed().required("Bắt buộc"),
      time: Yup.number()
        .required("Bắt buộc")
        .positive("Phải là số dương")
        .integer("Phải là số tự nhiên")
        .typeError("Nhập số phút"),
      price: Yup.number()
        .required("Bắt buộc")
        .positive("Phải là số dương")
        .typeError("Nhập số"),
      note: Yup.string(),
    }),
    onSubmit: async (values) => {
      let isValid = true;

      consumableUiList.forEach((parent, parentIndex) => {
        parent.forEach((item, index) => {
          switch (index) {
            case 1:
              break;
            case 4:
              if (Number(item) < 1) {
                isValid = false;
              }
              break;
            default:
              break;
          }
        });
      });
      prescriptionList.forEach((parent, parentIndex) => {
        parent.forEach((item, index) => {
          switch (index) {
            case 1:
              break;
            case 4:
              if (Number(item) < 1) {
                isValid = false;
              }
              break;
            case 5:
              if (item === "") {
                isValid = false;
              }
              break;
            default:
              break;
          }
        });
      });

      if (!isValid) {
        return;
      }

      let formData = new FormData();

      formData.append("name", values.name);
      formData.append("imageUrl", values.imageUrl[0]);
      formData.append("time", values.time);
      formData.append("price", values.price);
      formData.append("note", values.note);

      //append consumableUiList - Su dung tieu hao thuoc into formData
      for (var i = 0; i < consumableUiList.length; i++) {
        const tempOb = {
          medicineId: consumableUiList[i][0],
          numberOfUses: consumableUiList[i][5],
        };
        formData.append("consumable[]", JSON.stringify(tempOb));
      }

      for (var i = 0; i < prescriptionList.length; i++) {
        const tempOb = {
          medicineId: prescriptionList[i][0],
          quantity: prescriptionList[i][5],
          usage: prescriptionList[i][6],
        };
        formData.append("prescription[]", JSON.stringify(tempOb));
      }

      // handleClose();

      closeModal();
      values.name = "";
      values.imageUrl = null;
      values.time = 0;
      values.price = 0;
      values.note = "";

      await serviceProcessor.updateService(formData, serviceId);
      loadData();
      form.resetFields();
      resetData();
    },
  });

  const addConsumableRow = () => {
    // setIsShowSuggestion([...isShowSuggestion, true]);
    setConsumableUiList([...consumableUiList, ["", [], "", "", "", ""]]);
    setErrorList([...errorList, ["", "", "", "", "", ""]]);
  };

  const deleteConsumableUiList = (rowIndex) => {
    let temp = consumableUiList;
    temp.splice(rowIndex, 1);
    setConsumableUiList([...temp]);

    let tempError = errorList;
    tempError.splice(rowIndex, 1);
    setErrorList([...tempError]);
  };

  const addPrescriptionRow = () => {
    setPrescriptionList([...prescriptionList, ["", [], "", "", "", "", ""]]);
    setErrorListPre([...errorListPre, ["", "", "", "", "", "", ""]]);
  };

  const deleteprescriptionList = (rowIndex) => {
    let temp = prescriptionList;
    temp.splice(rowIndex, 1);
    setPrescriptionList([...temp]);

    let tempError = errorListPre;
    tempError.splice(rowIndex, 1);
    setErrorListPre([...tempError]);
  };

  function findIndexByProperty(data, key, value) {
    for (var i = 0; i < data.length; i++) {
      if (data[i][key] === value) {
        return i;
      }
    }
    return -1;
  }

  const getPermission = async (functionName) => {
    if (userB.role[0].name === "Admin") {
      setTemp(true);
      setDisabledinPut(false);
      return;
    }
    const functionArray = await axios({
      url: `/api/function`,
      method: "get",
    });
    const index = findIndexByProperty(functionArray.data, "name", functionName);

    await Promise.all(
      userB.role.map(async (element) => {
        const permission = await axios({
          url: `/api/permission/${element._id}/${functionArray.data[index]._id}`,
          method: "get",
        });
        if (permission.success === 0 || !permission.data) return;
        if (permission.data[0].edit === true) {
          setTemp(true);
          setDisabledinPut(false);
          return;
        }
      })
    );
    return;
  };

  return (
    <>
      <Modal
        id="serviceModal"
        // backdrop="static"
        show={isVisible}
        onHide={() => {
          closeModal();
          resetData();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin thủ thuật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form onSubmit={formik.handleSubmit}> */}
          <FormAntd
            form={form}
            name="basic"
            onFinish={formik.handleSubmit}
            autoComplete="off"
          >
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Mã thủ thuật</Form.Label>
                <Form.Control type="text" value={serviceId} disabled />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Tên thủ thuật</Form.Label>
                <Form.Control
                  id="name"
                  value={formik.values.name}
                  // value = {currService.name}
                  onChange={formik.handleChange}
                  readOnly={!temp}
                />
                {formik.errors.name && (
                  <p className="errorMsg"> {formik.errors.name} </p>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col}>
                <Form.Label column sm={12}>
                  Hình Ảnh
                </Form.Label>
                <UploadAndDisplayImage
                  userI={userB}
                  value={formik.values.imageUrl ? formik.values.imageUrl : []}
                  onChange={(value) => {
                    // console.log(value);
                    if (value && value.length > 0) {
                      formik.values.imageUrl = value;
                    }
                  }}
                />
                {formik.errors.imageUrl && (
                  <p className="errorMsg"> {formik.errors.imageUrl} </p>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label column sm={12}>
                  Thời gian (phút)
                </Form.Label>
                <Form.Control
                  readOnly={!temp}
                  id="time"
                  type="text"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  placeholder="0"
                />
                {formik.errors.time && (
                  <p className="errorMsg"> {formik.errors.time} </p>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col}>
                <Form.Label>Giá</Form.Label>
                <Row className="mb-3">
                  <Form.Group className="mb-3" as={Col}>
                    <Form.Control
                      readOnly={!temp}
                      id="price"
                      type="text"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      placeholder="0"
                    />{" "}
                    {formik.errors.price && (
                      <p className="errorMsg"> {formik.errors.price} </p>
                    )}
                  </Form.Group>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3" as={Col}>
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  readOnly={!temp}
                  as="textarea"
                  rows={3}
                  id="note"
                  value={formik.values.note}
                  onChange={formik.handleChange}
                />
                {formik.errors.note && (
                  <p className="errorMsg"> {formik.errors.note} </p>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label style={{ marginBottom: "4px" }}>
                  Sử dụng tiêu hao thuốc
                </Form.Label>
                <Button
                  onClick={addConsumableRow}
                  style={{
                    marginLeft: "10px",
                    padding: "12px",
                    paddingRight: "14px",
                    paddingLeft: "14px",
                  }}
                  variant="success"
                >
                  <FaPlusCircle></FaPlusCircle>
                </Button>
              </Col>
            </Row>
            <hr style={{ margin: "0px" }}></hr>
            <Table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã thuốc</th>
                  <th>Tên thuốc</th>
                  <th>Hàm lượng thuốc</th>
                  <th>Đơn vị</th>
                  <th>Công dụng</th>
                  <th>Số lần dùng</th>
                </tr>
              </thead>
              <tbody>
                {consumableUiList &&
                  consumableUiList.map((row, rowIndex) => {
                    return (
                      <tr>
                        <td style={{ width: "80px" }}>
                          <Form.Control
                            type="text"
                            disabled
                            value={rowIndex + 1}
                          />
                        </td>
                        <td>
                          <Form.Control disabled value={row[0]} />
                        </td>
                        <td>
                          <FormAntd.Item
                            name={`selectConu${rowIndex}`}
                            rules={[
                              {
                                required: true,
                                message: "Nhập tên thuốc",
                              },
                            ]}
                            initialValue={row[1]}
                          >
                            {/* Ten thuoc */}
                            <Typeahead
                              disabled={!temp}
                              id="basic-typeahead-single"
                              onChange={(e) => {
                                fillData(e, rowIndex);

                                let temp = consumableUiList;
                                temp[rowIndex][1] = e;
                                setConsumableUiList([...temp]);
                              }}
                              options={suggestionList}
                              selected={row[1]}
                              placeholder="Chọn tên thuốc..."
                            />
                          </FormAntd.Item>
                        </td>
                        <td>
                          {/* Ham luong thuoc */}
                          <Form.Control type="number" value={row[2]} disabled />
                        </td>
                        <td>
                          {/* Don vi */}
                          <Form.Control type="text" value={row[3]} disabled />
                        </td>
                        <td>
                          {/* Cong dung */}
                          <Form.Control
                            disabled
                            value={row[4]}
                            // onChange={formik.handleChange}
                          />
                        </td>
                        <td>
                          {/* So lan dung */}
                          <Form.Control
                            value={row[5]}
                            disabled={!temp}
                            min="1"
                            type="number"
                            onChange={(e) => {
                              let temp = consumableUiList;
                              temp[rowIndex][5] = e.target.value;
                              setConsumableUiList([...temp]);

                              let tempError = errorList;
                              if (Number(e.target.value) < 1) {
                                tempError[rowIndex][5] = "Nhập số lớn hơn 0";
                                setErrorList([...tempError]);
                              } else {
                                tempError[rowIndex][5] = "";
                                setErrorList([...tempError]);
                              }
                            }}
                          />
                          {errorList[rowIndex][5] !== "" && (
                            <Text type="danger">{errorList[rowIndex][5]}</Text>
                          )}
                        </td>
                        {temp === true ? (
                          <td
                            onClick={() => {
                              Swal.fire({
                                title: "Bạn có chắc chắn muốn xoá",
                                showDenyButton: true,
                                // showCancelButton: true,
                                confirmButtonText: "Xoá",
                                denyButtonText: `Huỷ`,
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                  deleteConsumableUiList(rowIndex);
                                } else if (result.isDenied) {
                                  // Swal.fire('Changes are not saved', '', 'info')
                                }
                              });
                            }}
                          >
                            <FaTrashAlt
                              cursor="pointer"
                              color="#e74c3c"
                              style={{ transform: "translateY(7px)" }}
                            />
                          </td>
                        ) : (
                          <td>
                            <></>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            <Row className="mb-3">
              <Col>
                <Form.Label style={{ marginBottom: "4px" }}>
                  Sử dụng cho đơn thuốc
                </Form.Label>
                <Button
                  onClick={addPrescriptionRow}
                  style={{
                    marginLeft: "10px",
                    padding: "12px",
                    paddingRight: "14px",
                    paddingLeft: "14px",
                  }}
                  variant="success"
                >
                  <FaPlusCircle></FaPlusCircle>
                </Button>
              </Col>
            </Row>
            <hr style={{ margin: "0px" }}></hr>
            <Table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã thuốc</th>
                  <th>Tên thuốc</th>
                  <th>Hàm lượng thuốc</th>
                  <th>Đơn vị</th>
                  <th>Công dụng</th>
                  <th>Số lần dùng</th>
                  <th>Cách sử dụng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {prescriptionList.map((row, rowIndex) => (
                  <tr>
                    <td style={{ width: "80px" }}>
                      <Form.Control type="text" disabled value={rowIndex + 1} />
                    </td>
                    <td>
                      <Form.Control disabled value={row[0]} />
                    </td>
                    <td>
                      {/* Ten thuoc */}
                      <FormAntd.Item
                        name={`selectPreu${rowIndex}`}
                        rules={[
                          {
                            required: true,
                            message: "Nhập tên thuốc",
                          },
                        ]}
                        initialValue={row[1]}
                      >
                        <Typeahead
                          id="basic-typeahead-single"
                          disabled={!temp}
                          onChange={(e) => {
                            fillDataPre(e, rowIndex);

                            // row[1] = e;
                            let temp = prescriptionList;
                            temp[rowIndex][1] = e;
                            setPrescriptionList([...temp]);
                          }}
                          options={suggestionList}
                          selected={row[1]}
                          placeholder="Chọn tên thuốc..."
                        />
                      </FormAntd.Item>
                    </td>
                    <td>
                      {/* Ham luong thuoc */}
                      <Form.Control type="number" value={row[2]} disabled />
                    </td>
                    <td>
                      {/* Don vi */}
                      <Form.Control disabled value={row[3]} />
                    </td>
                    <td>
                      {/* Cong dung */}
                      <Form.Control disabled value={row[4]} />
                    </td>
                    <td>
                      <Form.Control
                        value={row[5]}
                        disabled={!temp}
                        type="number"
                        // min="1"
                        // required
                        onChange={(e) => {
                          let temp = prescriptionList;
                          temp[rowIndex][5] = e.target.value;
                          setPrescriptionList([...temp]);

                          let tempError = errorListPre;
                          if (Number(e.target.value) < 1) {
                            tempError[rowIndex][5] = "Nhập số lớn hơn 0";
                            setErrorListPre([...tempError]);
                          } else {
                            tempError[rowIndex][5] = "";
                            setErrorListPre([...tempError]);
                          }
                        }}
                      />
                      {errorListPre[rowIndex][5] !== "" && (
                        <Text type="danger">{errorListPre[rowIndex][5]}</Text>
                      )}
                    </td>
                    {/* Cách sử dụng*/}
                    <td>
                      <Form.Control
                        disabled={!temp}
                        value={row[6]}
                        // defaultValue={row[5]}
                        type="text"
                        onChange={(e) => {
                          let temp = prescriptionList;
                          temp[rowIndex][6] = e.target.value;
                          setPrescriptionList([...temp]);

                          let tempError = errorListPre;
                          if (e.target.value === "") {
                            tempError[rowIndex][6] = "Bắt buộc nhập";
                            setErrorListPre([...tempError]);
                          } else {
                            tempError[rowIndex][6] = "";
                            setErrorListPre([...tempError]);
                          }
                        }}
                      />
                      {errorListPre[rowIndex][6] !== "" && (
                        <Text type="danger">{errorListPre[rowIndex][6]}</Text>
                      )}
                    </td>

                    {temp === true ? (
                      <td
                        onClick={() => {
                          Swal.fire({
                            title: "Bạn có chắc chắn muốn xoá",
                            showDenyButton: true,
                            confirmButtonText: "Xoá",
                            denyButtonText: `Huỷ`,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteprescriptionList(rowIndex);
                            } else if (result.isDenied) {
                            }
                          });
                        }}
                      >
                        <FaTrashAlt
                          cursor="pointer"
                          color="#e74c3c"
                          style={{ transform: "translateY(7px)" }}
                        />
                      </td>
                    ) : (
                      <td onClick={() => deleteprescriptionList(rowIndex)}>
                        <FaTrashAlt
                          onClick={"return false"}
                          cursor="pointer"
                          color="#e74c3c"
                          style={{ transform: "translateY(7px)" }}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
            {temp === true ? (
              <Button
                onClick={() => {
                  let tempError = errorList;
                  consumableUiList.forEach((parent, parentIndex) => {
                    parent.forEach((item, index) => {
                      switch (index) {
                        case 1:
                          break;
                        case 5:
                          if (Number(item) < 1) {
                            tempError[parentIndex][index] = "Nhập số lớn hơn 0";
                            setErrorList([...tempError]);
                          }
                          break;
                        default:
                          break;
                      }
                    });
                  });
                  let tempErrorPre = errorListPre;
                  prescriptionList.forEach((parent, parentIndex) => {
                    parent.forEach((item, index) => {
                      switch (index) {
                        case 1:
                          break;
                        case 5:
                          if (Number(item) < 1) {
                            tempErrorPre[parentIndex][index] =
                              "Nhập số lớn hơn 0";
                            setErrorListPre([...tempErrorPre]);
                          }
                          break;
                        case 6:
                          if (item === "") {
                            tempErrorPre[parentIndex][index] = "Bắt buộc nhập";
                            setErrorListPre([...tempErrorPre]);
                          }
                          break;
                        default:
                          break;
                      }
                    });
                  });
                }}
                type="submit"
                variant="primary"
                style={{ float: "right" }}
              >
                Lưu lại
              </Button>
            ) : null}
            {/* <Button type="submit" variant="primary" style={{ float: "right" }}>
              Lưu lại
            </Button> */}
            {temp === true ? (
              <Button
                style={{
                  float: "right",
                  marginRight: "10px",
                  backgroundColor: "gray",
                }}
                onClick={() => {
                  closeModal();
                  resetData();
                }}
              >
                Hủy bỏ
              </Button>
            ) : null}
          </FormAntd>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateServiceModal;
