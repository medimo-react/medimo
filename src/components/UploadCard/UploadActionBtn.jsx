import Button from "../Button/Button.jsx";
import styles from "./UploadActionBtn.module.css";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";

const UploadActionBtn = ({onClick,file}) => {
  return (
    <div className={styles.btn_wrap}>
      {file && <Button variant="outline" onClick={onClick}>삭제</Button>}
      <Button><MdOutlinePhotoCamera /> 카메라</Button>
    </div>
  )
}

export default UploadActionBtn;