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
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { Typeahead } from "react-bootstrap-typeahead";
import { useFetcher } from "react-router-dom";
import axios from "../../apis/api";
import Swal from "sweetalert2";

const KTVListModal = ({
  showKTV,
  closeKTV,
  ktvList,
  setKtvList,
  setErrorList,
  errorList,
  rowIndex,
  serID,
  PKID,
  customerId,
}) => {
  const [ktvListTemp, setKtvListTemp] = useState([]);

  const addKtvList = async () => {
    setKtvListTemp([...ktvListTemp, [new Date(), []]]);
  };
  const deleteKtvList = (rowIndex) => {
    let temp = ktvListTemp;
    temp.splice(rowIndex, 1);
    setKtvListTemp([...temp]);
  };

  const [techStaff, setTechStaff] = useState([]);

  const loadTechStaffForMedical = async () => {
    axios
      .get(`/api/medicalService/getTechStaff/${serID}`)
      .then((response) => {
        setKtvListTemp([
          ...response.data.map((item) => {
            console.log(item);
            return [item.dateDoing, [{ id: item.techId, name: item.name }]];
          }),
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadTechStaffData = () => {
    axios
      .get("/api/profile/getTechStaffToday")
      .then((response) => {
        setTechStaff([
          ...response.data.map((item) => ({
            name: item.fullname,
            id: item._id,
          })),
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadTechStaffForMedical();
    // setKtvListTemp([]);
    loadTechStaffData();
  }, [showKTV]);
  const dateFormat = "DD/MM/YYYY";

  const addKTV = async () => {
    ktvList[rowIndex] = ktvListTemp[ktvListTemp.length - 1];
    setKtvList(ktvList);

    try {
      await axios({
        url: `api/medicalService/addTechStaff/${serID}`,
        method: "post",
        data: {
          listKTV: ktvListTemp,
        },
      });
    } catch (error) {
      console.log(error);
    }
    setKtvListTemp([]);
    closeKTV();
  };

  return (
    <>
      <Modal
        // id="MedListPaper"
        size="lg"
        show={showKTV}
        onHide={closeKTV}
        // backdrop="static"
      >
        <FormAntd
          name="basic"
          //  onFinish={onSubmit}
        >
          <Modal.Header>
            <Modal.Title>Danh sách KTV</Modal.Title>
            <Button
              // type="submit"
              variant="primary"
              onClick={() => {
                addKTV();
              }}
            >
              OK
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3" style={{ margin: "5px" }}>
              <Col>
                <Button variant="success" onClick={addKtvList}>
                  <FaPlusCircle />
                </Button>
              </Col>
            </Row>
            <Table bordered>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Ngày</th>
                  <th>Tên kĩ thuật viên</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ktvListTemp.length > 0 &&
                  ktvListTemp.map((row, rowIndex) => {
                    return (
                      <tr style={{ textAlign: "center" }}>
                        <td>
                          <DatePicker
                            format={dateFormat}
                            value={dayjs(row[0])}
                            disabled
                          />
                        </td>
                        <td>
                          {/* Typeahead ktv */}
                          {/* <h1>{new Date(row[0]).getDate()}</h1>

                          <h1>{new Date().getDate()}</h1> */}
                          <Typeahead
                            disabled={
                              new Date(row[0]).getDate() ===
                              new Date().getDate()
                                ? false
                                : true
                            }
                            style={{ width: "100%", margin: "auto" }}
                            id="basic-typeahead-single"
                            labelKey="name"
                            onChange={(e) => {
                              let temp = ktvListTemp;
                              temp[rowIndex][1] = e;
                              setKtvListTemp([...temp]);
                            }}
                            options={techStaff}
                            placeholder="Chọn kĩ thuật viên"
                            selected={ktvListTemp[rowIndex][1]}
                            renderMenuItemChildren={(option) => (
                              <div>
                                {option.name}
                                <div>
                                  <small>ID: {option.id}</small>
                                </div>
                              </div>
                            )}
                          />
                        </td>
                        <td
                          onClick={() => {
                            Swal.fire({
                              title: "Bạn có chắc chắn muốn xoá",
                              showDenyButton: true,
                              confirmButtonText: "Xoá",
                              denyButtonText: `Huỷ`,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                // deleteMedListA(rowIndex);
                                deleteKtvList(rowIndex);
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
            </Table>
          </Modal.Body>
        </FormAntd>
      </Modal>
    </>
  );
};

export default KTVListModal;
