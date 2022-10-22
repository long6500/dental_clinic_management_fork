import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMedicineSuccess } from "../../redux/reducer/medicineSlice";

import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CloseButton from "react-bootstrap/CloseButton";
import { FaPlusCircle } from "react-icons/fa";
import { FaRedoAlt, FaEdit } from "react-icons/fa";
import MedicineModal from "./MedicineModal";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import medicineProcessor from "../../apis/medicineProcessor";
import UpdateMedicineModal from "./UpdateMedicineModal";
import ReactPaginate from "react-paginate";
import MedicineTable from "./MedicineTable";

const Medicine = ({ itemsPerPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [key, setKey] = useState("profile");
  const [medId, setMedID] = useState("");
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [searchMeds, setSearchMeds] = useState("")
  const meds = useSelector((state) => state.med.medicine);

  const loadData = async () => {
    medicineProcessor.getAll();
  };

  const openUpdateModal = (id) => {
    setMedID(id);
    setIsShowUpdate(true);
  };

  const closeUpdateModal = () => {
    setMedID("");
    setIsShowUpdate(false);
  };

  const handleSearch = (e) => {
    setSearchMeds(e.target.value)
  }

  //PAGINATION
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    if(meds.length > 0) {
      let tempMeds = meds.filter(item => item._id?.includes(searchMeds) || item.name?.includes(searchMeds))
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(tempMeds.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(tempMeds.length / itemsPerPage));
    } else {
      loadData()
    }
  }, [itemOffset, itemsPerPage, searchMeds, meds]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % meds.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  function MedTable({ currentItems }) {
    return (
      <>
        <Tabs id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="profile" title="Tất cả">
            <div style={{ marginLeft: "100px", marginRight: "100px" }}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control placeholder="Tìm kiếm" autoFocus value={searchMeds} onChange={handleSearch}/>
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
                      <tr key={index}>
                        <td style={{ width: "10%" }}>{med._id}</td>
                        <td style={{ textAlign: "center" }}>
                          <img src={med.imageUrl} style={{ height: "50px", width: "50px" }} alt="" />
                        </td>
                        <td>{med.name}</td>
                        <td>{med.usage}</td>
                        <td style={{ textAlign: "center" }}>
                          <FaEdit
                            color="#2980b9"
                            cursor={"pointer"}
                            size={25}
                            onClick={() => {
                              openUpdateModal(med._id);
                            }}
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
          </Tab>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <UpdateMedicineModal
        closeModal={closeUpdateModal}
        isVisible={isShowUpdate}
        medID={medId}
        loadData={loadData}
      ></UpdateMedicineModal>
      <Navbar>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <h4 style={{ display: "inline-block", margin: "10px" }}>
                Danh sách thuốc
              </h4>
            </Nav>
            <Form className="d-flex">
              <MedicineModal loadData={loadData}></MedicineModal>
              <Button
                variant="primary"
                style={{ marginRight: "20px" }}
                onClick={loadData}
              >
                <FaRedoAlt /> Tải lại
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MedTable currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Medicine;
