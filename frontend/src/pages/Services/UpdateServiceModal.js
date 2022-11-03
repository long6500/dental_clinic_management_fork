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

const UpdateServiceModal = ({ serviceId, isVisible, closeModal, loadData }) => {
  const [suggestionList, setSuggestionList] = useState([]);

  // const consumableUiListSuggest = { 1: true };

  const [isShowSuggestion, setIsShowSuggestion] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [consumableUiList, setConsumableUiList] = useState([]);

  const [currService, setCurrService] = useState({
    name: '',
    note: '',
    price: {$numberDecimal: -1},
    status: true,
    time: 0,
    _id: '',
    imageUrl: '',
    consumableArray: [],
    prescriptionArray: [],
  });
  const meds = useSelector((state) => state.med.medicine);

  const resetData = () => {
    setCurrService({
      _id: '',
      name: '',
      note: '',
      price: {$numberDecimal: -1},
      status: true,
      time: 0,
      imageUrl: '',
      consumableArray: [],
      prescriptionArray: [],
    })
  }

  const getService = async () => {
    // serviceId &&
    if(serviceId){
      await axios
        .get(`api/service/${serviceId}`)
        .then((response) => {
          console.log(response.data.data);
          setCurrService({...currService, ...response.data.data});
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
      resetData()
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
          closeModal()
          resetData()
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin thủ thuật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
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
                {
                  formik.values.consumableArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Form.Control 
                            defaultValue={index}
                            disabled
                            style={{width: '36px'}}
                          />
                        </td>
                        <td>
                          <Form.Control
                            value={item.medicineId}
                            disabled
                          />
                        </td>
                        <td>
                          <Form.Control 
                            value={item.medicineId}
                            disabled
                          />
                        </td>
                        <td>
                          <Form.Control 
                            type="number"
                            value={item.quanity}
                            disabled
                          />
                        </td>
                        <td>
                          <Form.Control 
                            value={item.unit}
                            onChange={formik.handleChange}
                          />
                        </td>
                        <td>
                          <Form.Control
                            name="consumableArray.numberOfUses"
                            type="number"
                            value={item.numberOfUses}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    )
                  })
                }
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
                closeModal()
                resetData()
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
