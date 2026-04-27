import {useState} from "react";
import Card from "../Card/Card.jsx";
import UploadDropBox from "./UploadDropBox.jsx";
import UploadActionBtn from "./UploadActionBtn.jsx";
import styles from "./UploadCard.module.css";

const UploadCard = () => {
  // 올린 파일 받기 위한 state
  const [file, setFile] = useState(null);

  // input file 클릭후 올리고 파일 정보 받기
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
  }

  const handleRemove = () => {
    setFile(null);
  };


  return (
      <Card radius={'sm'}>
        <p className={styles.title}>처방전 업로드</p>
        <UploadDropBox onChange={handleChange} file={file}/>
        <UploadActionBtn file={file} onClick={handleRemove}/>
      </Card>
  )
}

export default UploadCard;