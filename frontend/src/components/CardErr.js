import Swal from "sweetalert2";
function SwalCard(
  icon,
  title,
  text
) {
  return (
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
      })
  );


    }

export default SwalCard;