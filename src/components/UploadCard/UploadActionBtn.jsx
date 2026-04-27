import Button from "../Button/Button.jsx";
import styles from "./UploadActionBtn.module.css";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";

const UploadActionBtn = () => {
  return (
    <div className={styles.btn_wrap}>
      <Button><MdOutlinePhotoCamera /> 카메라</Button>
    </div>
  )
}

export default UploadActionBtn;