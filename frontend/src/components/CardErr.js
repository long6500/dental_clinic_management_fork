import Swal from "sweetalert2";
function SwalCard({
  icon,
  title,
  text
}) {
  return (
    Swal.fire({
        icon: "error",
        title: "Thông Báo",
        text: text,
      })
  );


    }

export default SwalCard;