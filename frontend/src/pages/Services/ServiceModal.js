import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addMed } from "../../apis/medicineProcessor";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import { FaTrashAlt } from "react-icons/fa";
import medicineProcessor from "../../apis/medicineProcessor";
import serviceProcessor from "../../apis/serviceProcessor";
import { useSelector } from "react-redux";
import axios from "axios";
import UploadAndDisplayImage from "../../components/uploadImage";
import { useFormik } from "formik";
import * as Yup from "yup";

const ServiceModal = ({ loadData }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      imageUrl: null,
      time: 0,
      price: 0,
      note: "",
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
      let formData = new FormData();

      formData.append("name", values.name);
      formData.append("imageUrl", values.imageUrl[0]);
      formData.append("time", values.time);
      formData.append("price", values.price);
      formData.append("note", values.note);
      for (var i = 0; i < consumableUiList.length; i++) {
        const tempOb = {
          medicineId: consumableUiList[i][0],
          numberOfUses: consumableUiList[i][4],
        };
        formData.append("consumable[]", JSON.stringify(tempOb));
      }

      for (var i = 0; i < prescriptionList.length; i++) {
        const tempOb = {
          medicineId: prescriptionList[i][0],
          quantity: prescriptionList[i][4],
          usage: prescriptionList[i][5],
        };
        formData.append("prescription[]", JSON.stringify(tempOb));
      }

      // for (var i = 0; i < prescriptionList.length; i++) {
      //   var myItemInArr = prescriptionList[i];
      //   for (var prop in myItemInArr) {
      //     fileData.append(`prescription[${i}][${prop}]`, myItemInArr[prop]);
      //   }
      // }

      handleClose();
      values.name = "";
      values.imageUrl = null;
      values.time = 0;
      values.price = 0;
      values.note = "";
      setConsumableUiList([]);
      setPrescriptionList([]);

      serviceProcessor.addService(formData);
      for (const value of formData.values()) {
        console.log(value);
      }
      // await loadData();
    },
  });

  // const handleAddService = async () => {
  //   // serviceProcessor.addService(service);
  //   handleClose();
  //   await loadData();
  // };

  const meds = useSelector((state) => state.med.medicine);
  const [suggestionList, setSuggestionList] = useState([]);
  const { Control } = Form;
  //only MedID
  const [selectedMed, setSelectedMed] = useState("");
  const [selectedMedObj, setSelectedMedObj] = useState({});
  const [isShowSuggestion, setIsShowSuggestion] = useState([]);
  const [isShowSuggestion1, setIsShowSuggestion1] = useState([]);

  const loadDataMed = async () => {
    medicineProcessor.getAll();
    handleClose();
  };

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

  const consumableUiListType = ["text", "select", "text", "text", "number"];
  const consumableUiListStyle = {
    // 1: "100px"
  };
  const consumableUiListSuggest = { 1: true };
  const [consumableUiList, setConsumableUiList] = useState([]);

  const disableList = [0, 2, 3];

  const deleteConsumableUiList = (rowIndex) => {
    let temp = consumableUiList;
    temp.splice(rowIndex, 1);
    setConsumableUiList([...temp]);
  };

  //prescriptionList
  const [prescriptionList, setPrescriptionList] = useState([]);

  const deleteprescriptionList = (rowIndex) => {
    let temp = prescriptionList;
    temp.splice(rowIndex, 1);
    setPrescriptionList([...temp]);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(prescriptionList);
  // }, [prescriptionList]);

  const addConsumableRow = () => {
    // consumableUiList.forEach(item => {
    //   item.forEach(item => {
    //     item
    //   })
    // })
    setIsShowSuggestion([...isShowSuggestion, true]);
    setConsumableUiList([...consumableUiList, ["", "", "", "", ""]]);
  };

  const addPrescriptionRow = () => {
    setIsShowSuggestion1([...isShowSuggestion1, true]);

    setPrescriptionList([...prescriptionList, ["", "", "", "", "", ""]]);
  };

  //searchTextBox for ID
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
                  // setSelectedMed(e.target.textContent);
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

  const searchTextBox1 = (data = [], rowIndex, colIndex) => {
    return (
      <div id="medCodeContainer" hidden={isShowSuggestion1[rowIndex]}>
        <ul>
          {data.map((item) => {
            return (
              <li
                onClick={(e) => {
                  isShowSuggestion1[rowIndex] = true;
                  setIsShowSuggestion1([...isShowSuggestion1]);
                  let tempList = prescriptionList;
                  tempList[rowIndex][colIndex] = e.target.textContent;

                  const searchResult = meds.find(
                    (item) => item.name === e.target.textContent
                  );
                  prescriptionList[rowIndex][colIndex - 1] = searchResult._id;
                  prescriptionList[rowIndex][colIndex] = searchResult.name;
                  prescriptionList[rowIndex][colIndex + 1] =
                    searchResult.quantity;
                  prescriptionList[rowIndex][colIndex + 2] = searchResult.unit;
                  setPrescriptionList(prescriptionList);
                  setPrescriptionList([...tempList]);
                  // setSelectedMed(e.target.textContent);
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
      <Button
        variant="success"
        onClick={handleShow}
        style={{ marginRight: "20px" }}
      >
        <FaPlusCircle></FaPlusCircle> Thêm thủ thuật
      </Button>
      <Modal
        id="serviceModal"
        // class="modal-dialog modal-xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin thủ thuật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <MedicineForm></MedicineForm> */}
          <>
            <Form onSubmit={formik.handleSubmit}>
              <Row className="mb-3">
                {/* <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Mã thủ thuật</Form.Label>
                  <Form.Control type="text" />
                </Form.Group> */}
                <Form.Group as={Col}>
                  <Form.Label>Tên thủ thuật</Form.Label>
                  <Form.Control
                    id="name"
                    // value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Nhập tên thủ thuật"
                  />
                  {formik.errors.name && (
                    <p className="errorMsg"> {formik.errors.name} </p>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group
                  className="mb-3"
                  as={Col}
                  controlId="formGroupPassword"
                >
                  <Form.Label column sm={12}>
                    Hình Ảnh
                  </Form.Label>
                  <UploadAndDisplayImage
                    value={formik.values.imageUrl ? formik.values.imageUrl : []}
                    onChange={(value) => {
                      console.log(value);
                      if (value && value.length > 0) {
                        formik.values.imageUrl = value;
                      }
                    }}
                  />
                  {formik.errors.imageUrl && (
                    <p className="errorMsg"> {formik.errors.imageUrl} </p>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
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

              {/* ConsumableList */}
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
                {consumableUiList.length > 0 && (
                  <tbody>
                    {consumableUiList.map((row, rowIndex) => {
                      return (
                        <tr>
                          <td style={{ width: "80px" }}>
                            <Control
                              type="text"
                              disabled
                              value={rowIndex + 1}
                            />
                          </td>
                          {row.map((col, colIndex) => {
                            return (
                              <>
                                <td
                                  style={{
                                    // width: `${consumableUiListStyle[colIndex]}`,
                                    position: "relative",
                                  }}
                                  onBlur={(e) => {
                                    if (
                                      e.relatedTarget.id === "searchMedName"
                                    ) {
                                      isShowSuggestion[rowIndex] = true;
                                      setIsShowSuggestion([
                                        ...isShowSuggestion,
                                      ]);
                                    }
                                  }}
                                >
                                  <Control
                                    id="searchMedName"
                                    className="searchMedName"
                                    type={consumableUiListType[colIndex]}
                                    value={col}
                                    onFocus={() => {
                                      if (consumableUiListSuggest[colIndex]) {
                                        isShowSuggestion[rowIndex] = false;
                                        setIsShowSuggestion([
                                          ...isShowSuggestion,
                                        ]);
                                      }
                                    }}
                                    //onChange k thay chay
                                    onChange={(e) => {
                                      console.log("onChange");
                                      let tempList = consumableUiList;
                                      tempList[rowIndex][colIndex] =
                                        e.target.value;
                                      setConsumableUiList([...tempList]);
                                    }}
                                    // style={erroolist[rowIndex][colIndex] && {border: 'red'}}
                                    disabled={
                                      disableList.includes(colIndex)
                                        ? true
                                        : false
                                    }
                                  />
                                  {consumableUiListSuggest[colIndex] &&
                                    searchTextBox(
                                      suggestionList,
                                      rowIndex,
                                      colIndex
                                    )}
                                </td>
                              </>
                            );
                          })}
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
                )}
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
                    <th>Số Lượng/SP</th>
                    <th>Cách Dùng</th>
                  </tr>
                </thead>
                {prescriptionList.length > 0 && (
                  <tbody>
                    {prescriptionList.map((row, rowIndex) => {
                      return (
                        <tr>
                          <td style={{ width: "80px" }}>
                            <Control
                              type="text"
                              disabled
                              value={rowIndex + 1}
                            />
                          </td>
                          {row.map((col, colIndex) => {
                            return (
                              <>
                                <td
                                  style={{
                                    width: `${consumableUiListStyle[colIndex]}`,
                                    position: "relative",
                                  }}
                                  onBlur={(e) => {
                                    if (
                                      e.relatedTarget.id === "searchMedName1"
                                    ) {
                                      isShowSuggestion1[rowIndex] = true;
                                      setIsShowSuggestion1([
                                        ...isShowSuggestion1,
                                      ]);
                                    }
                                  }}
                                >
                                  <Control
                                    id="searchMedName1"
                                    className="searchMedName1"
                                    type={consumableUiListType[colIndex]}
                                    value={col}
                                    onFocus={() => {
                                      console.log("focus");
                                      if (consumableUiListSuggest[colIndex]) {
                                        isShowSuggestion1[rowIndex] = false;
                                        setIsShowSuggestion1([
                                          ...isShowSuggestion1,
                                        ]);
                                      }
                                    }}
                                    onChange={(e) => {
                                      let tempList = prescriptionList;
                                      tempList[rowIndex][colIndex] =
                                        e.target.value;
                                      setPrescriptionList([...tempList]);
                                    }}
                                    // style={erroolist[rowIndex][colIndex] && {border: 'red'}}
                                    disabled={
                                      disableList.includes(colIndex)
                                        ? true
                                        : false
                                    }
                                  />
                                  {consumableUiListSuggest[colIndex] &&
                                    searchTextBox1(
                                      suggestionList,
                                      rowIndex,
                                      colIndex
                                    )}
                                </td>
                              </>
                            );
                          })}

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
                )}
              </Table>

              <Button
                type="submit"
                variant="primary"
                style={{ float: "right" }}
              >
                Lưu lại
              </Button>
              <Button
                style={{
                  float: "right",
                  marginRight: "10px",
                  backgroundColor: "gray",
                }}
                onClick={handleClose}
              >
                Hủy bỏ
              </Button>
            </Form>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ServiceModal;
