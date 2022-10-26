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

const ServiceModal = () => {
  const { Control } = Form;

  //consumableUiList
  const consumableUiListType = [
    "text",
    "text",
    "text",
    "text",
    "text",
    "number",
  ];
  const [consumableUiList, setConsumableUiList] = useState([]);

  const disableList = [2, 3];

  const deleteConsumableUiList = (rowIndex) => {
    let temp = consumableUiList;
    temp.splice(rowIndex, 1);
    setConsumableUiList([...temp]);
  };

  //prescriptionList
  const [prescriptionList, setPrescriptionList] = useState([]);

  const deleteprescriptionList = (rowIndex) => {
    console.log(rowIndex);
    let temp = prescriptionList;
    temp.splice(rowIndex, 1);
    setPrescriptionList([...temp]);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(consumableUiList);
  // }, [consumableUiList]);

  // useEffect(() => {
  //   console.log(prescriptionList);
  // }, [prescriptionList]);

  const addConsumableRow = () => {
    // consumableUiList.forEach(item => {
    //   item.forEach(item => {
    //     item
    //   })
    // })
    setConsumableUiList([...consumableUiList, ["", "", "", "", "", ""]]);
  };

  const addPrescriptionRow = () => {
    // consumableUiList.forEach(item => {
    //   item.forEach(item => {
    //     item
    //   })
    // })
    console.log("chay");
    setPrescriptionList([...prescriptionList, ["", "", "", "", "", ""]]);
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
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Mã thủ thuật</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Hình ảnh</Form.Label>
                  <Form.Control type="text" />
                  {/* <img src={} /> */}
                  {/* <UploadAndDisplayImage></UploadAndDisplayImage> */}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group
                  className="mb-3"
                  as={Col}
                  controlId="formGroupPassword"
                >
                  <Form.Label>Tên thủ thuật</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Thời gian (phút)</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Giá</Form.Label>
                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control defaultValue="0" />
                    </Form.Group>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control as="textarea" rows={3} />
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
                    <th>Một lần dùng</th>
                    <th>Số lần dùng</th>
                  </tr>
                </thead>
                {
                  // const [consumableUiList, setConsumableUiList] = useState([
                  //   {
                  //     medId: 1,
                  //     name: "long quay",
                  //     quanity: 11,
                  //     unit: 1,
                  //     uses: 1,
                  //     numberOfUses: 1,
                  //   },
                  // ]);
                  consumableUiList.length > 0 && (
                    <tbody>
                      {consumableUiList.map((row, rowIndex) => {
                        return (
                          <tr>
                            <td>
                              <Control
                                type="text"
                                disabled
                                value={rowIndex + 1}
                              />
                            </td>
                            {row.map((col, colIndex) => {
                              return (
                                <>
                                  <td>
                                    <Control
                                      type={consumableUiListType[colIndex]}
                                      value={col}
                                      onChange={(e) => {
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
                                  </td>
                                </>
                              );
                            })}
                            <td
                              onClick={() => deleteConsumableUiList(rowIndex)}
                            >
                              <FaTrashAlt cursor="pointer" color="#e74c3c" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )
                }
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
                          <td>
                            <input
                              type="text"
                              disabled
                              size="1 "
                              value={rowIndex + 1}
                            />
                          </td>
                          {/* {row.map((col, colIndex) => {
                              return (
                                <>
                                  <td>
                                    <Control
                                      type="text"
                                      value={col}
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
                                  </td>
                                </>
                              );
                            })} */}
                          <td>
                            <input type="text" />
                          </td>
                          <td>
                            <input type="text" />
                          </td>
                          <td>
                            <input type="text" disabled />
                          </td>
                          <td>
                            <input type="text" disabled />
                          </td>
                          <td>
                            <input type="text" />
                          </td>
                          <td>
                            <input type="text" />
                          </td>

                          <td onClick={() => deleteprescriptionList(rowIndex)}>
                            <FaTrashAlt cursor="pointer" color="#e74c3c" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </Table>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceModal;
