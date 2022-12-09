import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { FaBookMedical, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import {
  Select,
  Pagination,
  Table as TableAntd,
  Form as FormAntd,
  Space,
  Tag,
} from "antd";
import { Typeahead } from "react-bootstrap-typeahead";
import { useFetcher } from "react-router-dom";
import axios from "../../apis/api";
import Swal from "sweetalert2";

const MedListPaper = ({
  closeMedPaper,
  openMedPaper,
  singleSelectionsDoc,
  serListID,
}) => {
  const [form] = FormAntd.useForm();

  const [vv, setVV] = useState();

  const [medListA, setMedListA] = useState([]);

  //dem 1 nhip
  const [medName, setSingleMedName] = useState([]);
  //for options typeahead
  const [medNamelist, setMedNamelist] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    openMedPaper();
    setShow(false);
  };

  // const isFormValid = () => {
  //   form.getFieldsError().some(({ errors }) => errors.length > 0);
  // };

  const isnotFormValidd = () => {
    const temp = form.getFieldsError().map((item) => item.errors.length > 0);
    return temp;
  };

  const checkClose = (e) => {
    //chay khi length = 0 || length > 1 va dien du lieu
    //dk laf medListA.length > 1 && chua dien du lieu
    let tem = isnotFormValidd();
    console.log(tem);
    // console.log(form.getFieldsError());

    console.log(tem.includes(true));

    // console.log(e);
    if ((medListA.length >= 1 && !tem.includes(true)) || medListA.length < 1) {
      openMedPaper();
      setShow(false);
    }
  };

  const handleShow = () => {
    closeMedPaper();
    setShow(true);
    // console.log(singleSelectionsDoc);
  };

  const addMedListA = () => {
    setMedListA([...medListA, [[], "", "", ""]]);
  };

  useEffect(() => {
    console.log(medListA);
  }, [medListA]);

  const deleteMedListA = (rowIndex) => {
    //reset lai so luong
    // console.log(medListA[rowIndex]);

    // console.log(medListA[rowIndex][1]);
    medListA[rowIndex][1] = "";

    let temp = medListA;
    temp.splice(rowIndex, 1);
    setMedListA([...temp]);
  };

  const fillMedListA = (e, rowIndex) => {
    // console.log(e);
    // const searchResult = medNamelist.find((item) => item.name === e[0].name);
    // console.log(e[0].unit);

    if (e[0]?.name) {
      // medListA[rowIndex][0] = e[0].name;
      medListA[rowIndex][2] = e[0].unit;
      setMedListA(medListA);
    } else {
      // medListA[rowIndex][0] = "";
      medListA[rowIndex][2] = "";
    }
  };

  const loadMedData = async () => {
    await axios
      .get("/api/medicine/activeMedicine")
      .then((response) => {
        // setMedNamelist([
        //   ...response.data.map((u) => ({ id: u._id, name: u.name })),
        // ]);
        setMedNamelist(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [pre, setPre] = useState({});

  //get prescription meds from selected services
  const getMedFromSer = async () => {
    await axios
      .post(`/api/service/prescription`, pre)
      .then((response) => {
        setMedListA([
          ...medListA,
          ...response.data.map((i) => [[i.medicineId], "", "", ""]),
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadMedData();
  }, []);

  //
  useEffect(() => {
    console.log(serListID);
    // set serListID vao pre
    setPre({ serListId: serListID });
  }, [serListID]);

  return (
    <>
      <Button
        variant="warning"
        onClick={handleShow}
        style={{ marginRight: "20px", width: `200px` }}
        disabled={singleSelectionsDoc.length < 1 ? true : false}
      >
        <FaBookMedical></FaBookMedical> Đơn thuốc
      </Button>

      <Modal
        id="MedListPaper"
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <FormAntd name="basic" form={form}>
          <Modal.Header closeButton>
            <Modal.Title>Đơn thuốc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3" style={{ margin: "5px" }}>
              <Form.Label column sm={1}>
                Bác sỹ kê đơn
              </Form.Label>
              <Col sm={3}>
                <Form.Control
                  id="phone"
                  type="text"
                  disabled
                  value={`${singleSelectionsDoc[0]?.id} - ${singleSelectionsDoc[0]?.name}`}
                />
              </Col>
              <Col sm={3} style={{ width: "22%" }}>
                <Button
                  variant="success"
                  onClick={() => {
                    // console.log(pre);
                    getMedFromSer();
                  }}
                  style={{
                    // marginRight: "20px",
                    width: "80%",
                    maxWidth: "100%",
                  }}
                  disabled={singleSelectionsDoc.length < 1 ? true : false}
                >
                  Thuốc thủ thuật<FaPlusCircle></FaPlusCircle>
                </Button>
              </Col>
              <Col sm={3} style={{ width: "22%" }}>
                <Button
                  variant="success"
                  onClick={addMedListA}
                  style={{
                    // marginRight: "20px",
                    width: "70%",
                    maxWidth: "100%",
                  }}
                  disabled={singleSelectionsDoc.length < 1 ? true : false}
                >
                  Thuốc khác <FaPlusCircle></FaPlusCircle>
                </Button>
              </Col>
              <Col sm={2} style={{ width: "22%" }}>
                <Button
                  type="submit"
                  variant="primary"
                  // onClick={checkClose}
                  style={{
                    // marginRight: "20px",
                    width: "70%",
                    maxWidth: "100%",
                  }}
                  disabled={singleSelectionsDoc.length < 1 ? true : false}
                >
                  Nhập thuốc
                </Button>
              </Col>
            </Row>

            <Table bordered>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>STT</th>
                  <th>Tên thuốc</th>
                  <th>Số lượng</th>
                  <th>Đơn vị</th>
                  <th>Cách dùng</th>
                  <th></th>
                </tr>
              </thead>
              {medListA.length > 0 && (
                <tbody>
                  {medListA.map((row, rowIndex) => {
                    return (
                      <tr style={{ textAlign: "center" }}>
                        <td style={{ width: "1%" }}>
                          <Form.Control
                            style={{ textAlign: "center" }}
                            type="text"
                            // disabled
                            readOnly
                            plaintext
                            value={rowIndex + 1}
                          />
                        </td>
                        {/* Ten thuoc */}
                        <td style={{ width: "30%" }}>
                          <FormAntd.Item
                            name={`TK${rowIndex}`}
                            rules={[
                              {
                                required: true,
                                message: "Nhập tên thuốc",
                              },
                            ]}
                          >
                            <Typeahead
                              // clearButton
                              id="basic-typeahead-single"
                              labelKey="name"
                              onChange={(e) => {
                                row[0] = e;
                                fillMedListA(e, rowIndex);

                                let tempSelect = medName;
                                tempSelect[rowIndex] = e;
                                setSingleMedName([...tempSelect]);
                              }}
                              options={medNamelist}
                              placeholder="Nhập thuốc"
                              selected={row[0]}
                            />
                          </FormAntd.Item>
                        </td>
                        {/* So Luong */}
                        <td style={{ width: "12%" }}>
                          <FormAntd.Item
                            name={`SL${rowIndex}`}
                            rules={[
                              {
                                required: true,
                                message: "Nhập số lượng",
                              },
                            ]}
                          >
                            <Form.Control
                              type="number"
                              min="1"
                              onChange={(e) => {
                                const temp = e.target.value;
                                row[1] = temp;

                                let tempSelect = medName;
                                tempSelect[rowIndex] = e;
                                setSingleMedName([...tempSelect]);
                              }}
                              value={row[1]}
                            />
                          </FormAntd.Item>
                        </td>
                        {/* Don vi */}
                        <td style={{ width: "12%" }}>
                          <Form.Control disabled value={row[2]} />
                        </td>
                        {/* Cach dung */}
                        <td style={{ width: "30%" }}>
                          <Form.Control
                            type="text"
                            onChange={(e) => {
                              row[3] = e.target.value;
                            }}
                          />
                        </td>
                        {/* Btn Delete */}
                        <td
                          onClick={() => {
                            Swal.fire({
                              title: "Bạn có chắc chắn muốn xoá",
                              showDenyButton: true,
                              confirmButtonText: "Xoá",
                              denyButtonText: `Huỷ`,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteMedListA(rowIndex);
                              } else if (result.isDenied) {
                              }
                            });
                          }}
                        >
                          <FaTrashAlt
                            size={20}
                            cursor="pointer"
                            color="#e74c3c"
                            style={{ transform: "translateY(2px)" }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </Table>
          </Modal.Body>
        </FormAntd>
      </Modal>
    </>
  );
};

export default MedListPaper;
