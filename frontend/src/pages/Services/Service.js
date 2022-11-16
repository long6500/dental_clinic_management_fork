import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { getMedicineSuccess } from "../../redux/reducer/medicineSlice";
import ReactPaginate from "react-paginate";
import axios from "../../apis/api";

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
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import ServiceModal from "./ServiceModal";
import serviceProcessor from "../../apis/serviceProcessor";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import CustomToast from "../../components/CustomToast";
import UpdateServiceModal from "./UpdateServiceModal";

const Service = ({ itemsPerPage }) => {
  const [key, setKey] = useState("profile");
  const [searchSers, setSearchSers] = useState("");

  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [serviceId, setServiceId] = useState("");

  const [services, setServices] = useState([]);

  const openUpdateModal = () => {
    setIsShowUpdate(true);
  };

  const closeUpdateModal = () => {
    setIsShowUpdate(false);
  };

  const handleSearch = (e) => {
    setSearchSers(e.target.value);
  };

  const loadData = async () => {
    console.log("service");

    await axios
      .get("/api/service")
      .then((response) => {
        setServices(response.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
    // setServices(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    loadData();
  }, [services.length]);

  const [isToast, setIsToast] = useState({
    value: false,
    isSuccess: true,
    content: "",
  });

  const showToast = (content, isSuccess) => {
    setIsToast({
      ...isToast,
      content: content,
      isSuccess: isSuccess,
      value: true,
    });
  };

  //PAGINATION
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    if (services.length > 0) {
      let temps = services.filter(
        (item) =>
          item._id?.includes(searchSers) || item.name?.includes(searchSers)
      );
      // console.log(searchSers);
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(temps.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(temps.length / itemsPerPage));
    } else {
      loadData();
    }
  }, [itemOffset, itemsPerPage, searchSers, services]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % services.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const ServiceTable = ({ currentItems }) => {
    return (
      <>
        <div
          style={{
            position: "fixed",
            right: "10px",
            bottom: "20px",
            zIndex: "3",
          }}
        >
          <CustomToast
            value={isToast.value}
            content={isToast.content}
            isSuccess={isToast.isSuccess}
            onClose={() => {
              setIsToast({ ...isToast, value: false });
            }}
          />
        </div>
        <Tabs id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="profile" title="Tất cả">
            <div style={{ marginLeft: "100px", marginRight: "100px" }}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    placeholder="Tìm kiếm"
                    autoFocus
                    value={searchSers}
                    onChange={handleSearch}
                  />
                </Form.Group>
              </Form>
              <Table striped bordered hover>
                <thead>
                  <tr
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <th>Mã thủ thuật</th>
                    <th>Ảnh</th>
                    <th>Tên thủ thuật</th>
                    <th>Giá</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((service, index) => {
                    return (
                      <tr
                        key={index}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <td>{service._id}</td>
                        <td>
                          <img
                            style={{ height: "50px", width: "50px" }}
                            src={service.imageUrl}
                            alt=""
                          />
                        </td>
                        <td>{service.name}</td>
                        <td>{service.price?.$numberDecimal}</td>
                        <td>
                          {service.status ? (
                            <AiOutlineCheck color="#009432" size={25} />
                          ) : (
                            <AiOutlineCloseCircle color="#EA2027" size={25} />
                          )}
                        </td>
                        <td>
                          <FaEdit
                            className="mx-2"
                            color="#2980b9"
                            cursor={"pointer"}
                            size={25}
                            onClick={() => {
                              setServiceId(service._id);
                              openUpdateModal();
                            }}
                          />
                          <Form.Check
                            type="switch"
                            checked={service.status}
                            style={{ display: "inline", marginLeft: "10px" }}
                            onChange={async (e) => {
                              // refreshData(e, med, index);
                              const result =
                                await serviceProcessor.changeStatus(
                                  service._id,
                                  e.target.checked
                                );
                              if (result.success === 1) {
                                showToast(
                                  `Cập nhật id: ${service._id} thành công`,
                                  true
                                );
                                // setTimeout(() => {
                                //   loadData();
                                // },1);
                                await loadData();
                              }
                            }}
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
  };

  return (
    <>
      <UpdateServiceModal
        closeModal={closeUpdateModal}
        isVisible={isShowUpdate}
        serviceId={serviceId}
        loadData={loadData}
      />
      <Navbar>
        <Container fluid>
          {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <h4 style={{ display: "inline-block", margin: "10px" }}>
                Danh sách Thủ Thuật
              </h4>
            </Nav>
            <Form className="d-flex">
              <ServiceModal loadData={loadData} />

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

      <ServiceTable currentItems={currentItems} />
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

export default Service;
