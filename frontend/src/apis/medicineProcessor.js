import axios from "axios";
import { addMedicine } from "../redux/reducer/medicineSlice";
import { getMedicineSuccess } from '../redux/reducer/medicineSlice'
import { setLoading, setNotLoading, toggleLoading } from '../redux/reducer/loading'
import { store } from '../redux/store'
import Swal from 'sweetalert2'

const medProcessor = {}

export const addMed = async (medicine, navigate) => {
  try {
    const res = await axios.post("/api/medicine/", medicine);
    store.dispatch(addMedicine(res.data));
    navigate("/medicine");
  } catch (error) {
    console.log(error);
  }
};

medProcessor.addMed = async (medicine, navigate) => {
  try {
    const res = await axios.post("/api/medicine/", medicine);
    store.dispatch(addMedicine(res.data));
    navigate("/medicine");
  } catch (error) {
    console.log(error);
  }
}

medProcessor.getAll = () => {
  store.dispatch(setLoading())
  const response = axios.get("/medicine")
  .then(response => {
    store.dispatch(getMedicineSuccess(response.data));
  })
  .catch((err) => {
    Swal.fire({
      icon: 'error',
      title: 'Lây dữ liệu thất bại',
      text: 'Vui lòng kiểm tra lại kết nối mạng',
    })
  });
  store.dispatch(setNotLoading())
}

medProcessor.getAllObj = async () => {
  const result = [];
  await axios.get("/medicine")
  .then(response => {
    result = response.data
  })
  .catch((err) => {
    console.log("Err: ", err)
  });
  return result
}


export default medProcessor