import axios from "axios";
import Swal from "sweetalert2";

const serviceProcessor = {};

serviceProcessor.getAllService = async () => {
  let serviceList = [];
  await axios
    .get("/api/service")
    .then((response) => {
      serviceList = response.data.data;
      console.log("api service: " + serviceList);
    })
    .catch((err) => {
      console.log("Err: ", err);
    });
  return serviceList;
};

serviceProcessor.getServiceDetail = async (id) => {
  const response = await axios
    .get(`api/service/${id}`)
    .then((response) => {})
    .catch((err) => {
      console.log("Err: ", err);
    });
};

serviceProcessor.addService = async (service) => {
  try {
    await axios.post("/api/service/", service);
  } catch (error) {
    console.log("Err: ", error);
  }
};

serviceProcessor.updateService = async (service, id) => {
  try {
    await axios.put(`api/service/${id}`, service);
  } catch (error) {
    console.log("Err: ", error);
  }
};

serviceProcessor.changeStatus = async (id, state, navigate) => {
  const result = await axios.put(`api/service/${id}/${state}`);
  if (result.data.success !== 1) {
    Swal.fire("Thất bại", `Cập nhật thất bại tại id=${id}`, "failed");
  }
  return result.data;
};

export default serviceProcessor;
