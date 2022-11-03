import axios from "axios";
import { addMedicine } from "../redux/reducer/medicineSlice";
import {
  getMedicineSuccess,
  getMedDetailSuccess,
} from "../redux/reducer/medicineSlice";
import {
  setLoading,
  setNotLoading,
  toggleLoading,
} from "../redux/reducer/loading";
import { store } from "../redux/store";
import Swal from "sweetalert2";

const medProcessor = {};

export const addMed = async (medicine, navigate) => {
  try {
    await axios.post("/api/medicine/", medicine)
    .then(response => {
      store.dispatch(addMedicine(response.data.data));
    })
    .catch(error => {
      console.log(error);
    });
    // navigate("/medicine");
  } catch (error) {
    console.log(error);
  }
};

medProcessor.addMed = async (medicine, navigate) => {
  try {
    const res = await axios.post("/api/medicine/", medicine);
    store.dispatch(addMedicine(res.data));
    console.log(res.data);
    navigate("/medicine");
  } catch (error) {
    console.log(error);
  }
};

medProcessor.getAll = async () => {
  store.dispatch(setLoading());
  await axios
    .get("/api/medicine")
    .then((response) => {
      store.dispatch(getMedicineSuccess(response.data.data));
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Lây dữ liệu thất bại",
        text: "Vui lòng kiểm tra lại kết nối mạng",
      });
    });
  store.dispatch(setNotLoading());
};

medProcessor.getAllObj = async () => {
  const result = await axios.get("/api/medicine")
  return result.data.data;
};

// medProcessor.getAllObj = async () => {
//   const result = await axios
//     .get("/api/medicine");
//     // console.log(response.data);
//   return result.data.data;
// };

medProcessor.getMedicineDetailObj = (id) => {
  const response = axios
    .get(`api/medicine/${id}`)
    .then((response) => {
      store.dispatch(getMedDetailSuccess(response.data.data));
    })
    .catch((err) => {
      console.log("Err: ", err);
    });
};

medProcessor.updateMedcine = async (med, navigate) => {
  let tempId = med._id;
  delete med._id
  delete med.createdAt
  delete med.updatedAt
  delete med.__v
  await axios
    .put(`api/medicine/${tempId}`, med)
    // .then(navigate("/medicine"))
    .catch((err) => {
      console.log("Err: ", err);
    });
};

medProcessor.changeStatus = async (id, state, navigate) => {
  const result = await axios.put(`api/medicine/${id}/${state}`)
  if(result.data.success !== 1){
    Swal.fire(
      'Thất bại',
      `Cập nhật thất bại tại id=${id}`,
      'failed'
    )
  }
  return result.data
};

export default medProcessor;
