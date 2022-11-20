import axios from "./api";
// import axios from "axios";
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
    await axios
      .post("/api/medicine/", medicine)
      .then((response) => {
        store.dispatch(addMedicine(response.data.data));
      })
      .catch((error) => {
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
  // console.log("dau");
  // const token = localStorage.getItem("token");
  // console.log("token " + token);
  const response = await axios.get("/api/medicine");
  store.dispatch(getMedicineSuccess(response.data));
  //   console.log(res);
  // .catch((err) => {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Lây dữ liệu thất bại",
  //     text: "Vui lòng kiểm tra lại kết nối mạng",
  //   });
  // });
  // console.log(res.data);
  store.dispatch(setNotLoading());
};

// medProcessor.getAll = async () => {
//   store.dispatch(setLoading());
//   console.log("dau");
//   // const res = await axios.get
//   //   .get("/api/medicine")
//   var res;
//   try {
//     res = axios({
//       url: "/api/medicine",
//       method: "get",
//     });
//     console.log("dau 1");
//   } catch (error) {
//     console.log(error);
//   }
//   setTimeout(console.log("asdas" + res.data), 5000);

//   store.dispatch(setNotLoading());
// };

medProcessor.getAllObj = async () => {
  const result = await axios.get("/api/medicine");
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
      store.dispatch(getMedDetailSuccess(response.data));
    })
    .catch((err) => {
      console.log("Err: ", err);
    });
};

medProcessor.updateMedcine = async (med) => {
  let tempId = med._id;
  // delete med._id;
  // delete med.createdAt;
  // delete med.updatedAt;
  // delete med.__v;
  await axios
    .put(`api/medicine/${tempId}`, med)
    // .then(navigate("/medicine"))
    .catch((err) => {
      console.log("Err: ", err);
    });
};

medProcessor.changeStatus = async (id, state, navigate) => {
  const result = await axios.put(`api/medicine/${id}/${state}`);
  if (result.data.success !== 1) {
    Swal.fire("Thất bại", `Cập nhật thất bại tại id=${id}`, "failed");
  }
  return result.data;
};

export default medProcessor;
