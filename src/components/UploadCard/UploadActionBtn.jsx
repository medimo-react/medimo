import { useRef } from "react";
import Button from "../Button/Button.jsx";
import styles from "./UploadActionBtn.module.css";
import { MdOutlinePhotoCamera } from "react-icons/md";

const UploadActionBtn = ({ onClick, file, onCameraCapture, isScanning }) => {
  const cameraInputRef = useRef(null);

  const handleCameraChange = (e) => {
    const capturedFile = e.target.files[0];
    if (!capturedFile) return;
    onCameraCapture(capturedFile);
    e.target.value = "";
  };

  return (
    <div className={styles.btn_wrap}>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleCameraChange}
      />
      {file && <Button variant="outline" onClick={onClick}>삭제</Button>}
      <Button onClick={() => cameraInputRef.current?.click()} disabled={isScanning}>
        <MdOutlinePhotoCamera /> {isScanning ? "스캔 중..." : "카메라"}
      </Button>
    </div>
  );
};

export default UploadActionBtn;