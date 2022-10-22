import React from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { FaRedoAlt, FaEdit } from "react-icons/fa";

const MedicineTable = ({ currentItems }) => {
  return (
    <>
      <div style={{ marginLeft: "100px", marginRight: "100px" }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control placeholder="Tìm kiếm" />
          </Form.Group>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mã thuốc</th>
              <th>Ảnh</th>
              <th>Tên thuốc</th>
              <th>Cách sử dụng</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((med, index) => {
              return (
                <tr>
                  <td style={{ width: "10%" }}>{med._id}</td>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={med.imageUrl}
                      style={{ height: "50px", width: "50px" }}
                    />
                  </td>
                  <td>{med.name}</td>
                  <td>{med.usage}</td>
                  <td style={{ textAlign: "center" }}>
                    <FaEdit
                      color="#2980b9"
                      cursor={"pointer"}
                      size={25}
                    //   onClick={() => {
                    //     openUpdateModal(med._id);
                    //   }}
                    />
                    <Form.Check
                      type="switch"
                      style={{ display: "inline", marginLeft: "10px" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default MedicineTable;
