import {useState} from "react";
import Card from "../Card/Card.jsx";
import UploadDropBox from "./UploadDropBox.jsx";
import UploadActionBtn from "./UploadActionBtn.jsx";
import styles from "./UploadCard.module.css";

const UploadCard = () => {
  // 올린 파일 받기 위한 state
  const [file, setFile] = useState(null);

  // 드래그 상태를 알기 위한 state
  const [isDrag, setIsDrag] = useState(false);

  // input file 클릭후 올리고 파일 정보 받기
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
  }

  // input drag기능
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDrag(false);

    const droppedFile = e.dataTransfer.files[0];

    setFile(droppedFile);
  };

  // 업로드된 파일 삭제
  const handleRemove = () => {
    setFile(null);
  };

  return (
      <Card radius={'sm'}>
        <p className={styles.title}>처방전 업로드</p>
        <UploadDropBox isDrag={isDrag} setIsDrag={setIsDrag} onChange={handleChange} onDrop={handleDrop} file={file}/>
        <UploadActionBtn file={file} onClick={handleRemove}/>
      </Card>
  )
}

export default UploadCard;