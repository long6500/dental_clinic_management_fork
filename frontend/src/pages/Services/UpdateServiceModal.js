import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import serviceProcessor from "../../apis/serviceProcessor";
import axios from "axios";
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
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const UpdateServiceModal = ({ serviceId, isVisible, closeModal, loadData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const [suggestionList, setSuggestionList] = useState([]);

  // const consumableUiListSuggest = { 1: true };

  const [isShowSuggestion, setIsShowSuggestion] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [consumableUiList, setConsumableUiList] = useState([]);
  const [prescriptionList, setPrescriptionList] = useState([]);

  const [singleSelections, setSingleSelections] = useState([]);
  const [singleSelectionsPre, setSingleSelectionsPre] = useState([]);

  const [currService, setCurrService] = useState({
    name: "",
    note: "",
    price: { $numberDecimal: -1 },
    status: true,
    time: 0,
    _id: "",
    imageUrl: "",
    consumableArray: [],
    prescriptionArray: [],
  });
  const meds = useSelector((state) => state.med.medicine);

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

  const addPrescriptionRow = () => {
    // setIsShowSuggestion1([...isShowSuggestion1, true]);

    setPrescriptionList([...prescriptionList, ["", "", "", "", "", ""]]);
  };

  const getService = async () => {
    // serviceId &&
    if (serviceId) {
      await axios
        .get(`api/service/${serviceId}`)
        .then((response) => {
          console.log(response.data.data);
          setCurrService({ ...currService, ...response.data.data });
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    }
    //Update consumableUiList
    // setConsumableUiList([...consumableUiList, currService.consumableArray]);
    // console.log(serviceId);
  };

  const loadDataMed = async () => {
    medicineProcessor.getAll();
    handleClose();
  };

  useEffect(() => {
    getService();
  }, [serviceId]);

  useEffect(() => {
    loadDataMed();
    if (meds.length > 0) {
      setSuggestionList([...meds.filter((item) => item.status === true)]);
    }
  }, []);

  useEffect(() => {
    if (suggestionList.length < 1) {
      setSuggestionList([...meds.filter((item) => item.status === true)]);
    }
  }, [meds]);

  const fillData = (e, rowIndex) => {
    // let tempList = consumableUiList;
    console.log(consumableUiList);

    const searchResult = meds.find((item) => item.name === e[0]);

    if (searchResult) {
      consumableUiList[rowIndex][0] = searchResult._id;
      // consumableUiList[rowIndex][1] = e[0];
      consumableUiList[rowIndex][2] = searchResult.quantity;
      consumableUiList[rowIndex][3] = searchResult.unit;
      setConsumableUiList(consumableUiList);
    } else {
      consumableUiList[rowIndex][0] = "";
      consumableUiList[rowIndex][2] = "";
      consumableUiList[rowIndex][3] = "";
    }
    // setConsumableUiList([...tempList]);
  };

  const fillDataPre = (e, rowIndex) => {
    const searchResult = meds.find((item) => item.name === e[0]);

    if (searchResult) {
      prescriptionList[rowIndex][0] = searchResult._id;
      prescriptionList[rowIndex][2] = searchResult.quantity;
      prescriptionList[rowIndex][3] = searchResult.unit;
      setPrescriptionList(prescriptionList);
    } else {
      prescriptionList[rowIndex][0] = "";
      prescriptionList[rowIndex][2] = "";
      prescriptionList[rowIndex][3] = "";
    }
  };

  const formik = useFormik({
    initialValues: {
      name: currService.name,
      imageUrl: currService.imageUrl,
      time: currService.time,
      price: currService.price?.$numberDecimal,
      note: currService.note,
      // consumableArray: [],
      consumableArray: currService.consumableArray,
      // prescription: []
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      imageUrl: Yup.mixed().required("Bắt buộc"),
      time: Yup.number()
        .required("Required")
        .positive("Phải là số dương")
        .integer("Phải là số tự nhiên"),
      price: Yup.number().required("Required").positive("Phải là số dương"),
      note: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log(values.name);
      let formData = new FormData();

      formData.append("name", values.name);
      formData.append("imageUrl", values.imageUrl[0]);
      formData.append("time", values.time);
      formData.append("price", values.price);
      formData.append("note", values.note);

      // for (var i = 0; i < consumableUiList.length; i++) {
      //   const tempOb = {
      //     userId: consumableUiList[i][0],
      //     numberOfUses: consumableUiList[i][4],
      //   };
      //   formData.append("consumable[]", JSON.stringify(tempOb));
      // }

      // handleClose();
      closeModal();
      values.name = "";
      values.imageUrl = null;
      values.time = 0;
      values.price = 0;
      values.note = "";

      serviceProcessor.updateService(formData, serviceId);
      await loadData();
      resetData();
    },
  });

  const addConsumableRow = () => {
    // consumableUiList.forEach(item => {
    //   item.forEach(item => {
    //     item
    //   })
    // })
    setIsShowSuggestion([...isShowSuggestion, true]);
    setConsumableUiList([...consumableUiList, ["", "", "", "", ""]]);
  };

  const deleteConsumableUiList = (rowIndex) => {
    let temp = consumableUiList;
    temp.splice(rowIndex, 1);
    setConsumableUiList([...temp]);
  };

  const deleteprescriptionList = (rowIndex) => {
    let temp = prescriptionList;
    temp.splice(rowIndex, 1);
    setPrescriptionList([...temp]);
  };

  const searchTextBox = (data = [], rowIndex, colIndex) => {
    return (
      <div id="medCodeContainer" hidden={isShowSuggestion[rowIndex]}>
        <ul>
          {data.map((item) => {
            return (
              <li
                onClick={(e) => {
                  isShowSuggestion[rowIndex] = true;
                  setIsShowSuggestion([...isShowSuggestion]);
                  let tempList = consumableUiList;
                  tempList[rowIndex][colIndex] = e.target.textContent;
                  const searchResult = meds.find(
                    (item) => item.name === e.target.textContent
                  );
                  consumableUiList[rowIndex][colIndex - 1] = searchResult._id;
                  consumableUiList[rowIndex][colIndex] = searchResult.name;
                  consumableUiList[rowIndex][colIndex + 1] =
                    searchResult.quantity;
                  consumableUiList[rowIndex][colIndex + 2] = searchResult.unit;
                  setConsumableUiList(consumableUiList);

                  setConsumableUiList([...tempList]);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
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
          <Form onSubmit={handleSubmit(formik.handleSubmit)}>
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
                  <th>Lượng</th>
                  <th>Đơn vị</th>
                  <th>Số lần dùng</th>
                </tr>
              </thead>
              <tbody>
                {consumableUiList.map((row, rowIndex) => {
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
                        {/* Name Service thay bằng TypeHead*/}
                        <Typeahead
                          id="basic-typeahead-single"
                          onChange={(e) => {
                            fillData(e, rowIndex);
                            let tempSelect = singleSelections;
                            tempSelect[rowIndex] = e;
                            setSingleSelections([...tempSelect]);
                          }}
                          options={suggestionList}
                          selected={singleSelections[rowIndex]}
                          placeholder="Chọn tên thuốc..."
                        />
                      </td>
                      <td>
                        {/* Lượng */}
                        <Form.Control type="number" value={row[2]} disabled />
                      </td>
                      <td>
                        {/* Đơn vị */}
                        <Form.Control
                          disabled
                          value={row[3]}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* Số lần dùng */}
                        <Form.Control
                          // id={`consumableArray[${rowIndex}].numberOfUses`}
                          type="number"
                          // min="1"
                          // required
                          // defaultValue={1}
                          // value={row.numberOfUses}
                          // onChange={formik.handleChange}
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                          {...register(`singleErrorInput${rowIndex}`, {
                            required: "Bắt buộc",
                            min: {
                              value: 1,
                              message: "Lớn hơn 1",
                            },
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`singleErrorInput${rowIndex}`}
                          render={({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                              <p key={type} style={{ color: "red" }}>
                                {message}
                              </p>
                            ))
                          }
                        />
                      </td>

                      <td onClick={() => deleteConsumableUiList(rowIndex)}>
                        <FaTrashAlt
                          cursor="pointer"
                          color="#e74c3c"
                          style={{ transform: "translateY(7px)" }}
                        />
                      </td>
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
                  <th>Lượng</th>
                  <th>Đơn vị</th>
                  <th>Số lần dùng</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionList.map((row, rowIndex) => {
                  return (
                    <tr>
                      <td style={{ width: "80px" }}>
                        <Form.Control
                          type="text"
                          disabled
                          value={rowIndex + 1}
                        />
                      </td>
                      {/* Chinh sua o day */}
                      <td>
                        <Form.Control disabled value={row[0]} />
                      </td>
                      <td>
                        {/* Name Service thay bằng TypeHead*/}
                        <Typeahead
                          id="basic-typeahead-single"
                          onChange={(e) => {
                            fillDataPre(e, rowIndex);
                            let tempSelect = singleSelectionsPre;
                            tempSelect[rowIndex] = e;
                            setSingleSelectionsPre([...tempSelect]);
                          }}
                          options={suggestionList}
                          selected={singleSelectionsPre[rowIndex]}
                          placeholder="Chọn tên thuốc..."
                        />
                      </td>
                      <td>
                        {/* Lượng */}
                        <Form.Control type="number" value={row[2]} disabled />
                      </td>
                      <td>
                        {/* Đơn vị */}
                        <Form.Control
                          disabled
                          value={row[3]}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* Số Lượng/SP */}
                        <Form.Control
                          type="number"
                          {...register(`Prescript${rowIndex}`, {
                            required: "Bắt buộc",
                            min: {
                              value: 1,
                              message: "Lớn hơn 1",
                            },
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`Prescript${rowIndex}`}
                          render={({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                              <p key={type} style={{ color: "red" }}>
                                {message}
                              </p>
                            ))
                          }
                        />
                      </td>

                      <td>
                        {/* Cachs dung*/}
                        <Form.Control
                          type="text"
                          {...register(`Prescriptusage${rowIndex}`, {
                            required: "Bắt buộc",
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`Prescriptusage${rowIndex}`}
                          render={({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                              <p key={type} style={{ color: "red" }}>
                                {message}
                              </p>
                            ))
                          }
                        />
                      </td>
                      <td onClick={() => deleteprescriptionList(rowIndex)}>
                        <FaTrashAlt
                          cursor="pointer"
                          color="#e74c3c"
                          style={{ transform: "translateY(7px)" }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Button type="submit" variant="primary" style={{ float: "right" }}>
              Lưu lại
            </Button>
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
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateServiceModal;
