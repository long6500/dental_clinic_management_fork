import axios from "axios";

const serviceProcessor = {};

serviceProcessor.getAllService = async () => {
  const serviceList = [];
  const res = axios
    .get("/api/service")
    .then((response) => {
      serviceList = response.data.data;
    })
    .catch((err) => {
      console.log("Err: ", err);
    });
  return;
};

serviceProcessor.addService = async(service, navigate) =>{
    try {
        await axios.post("/api/medicine/", service);
    } catch (error) {
        console.log("Err: ", error);
    }
}

export default serviceProcessor;
