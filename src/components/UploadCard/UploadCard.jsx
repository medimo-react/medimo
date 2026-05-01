import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card.jsx";
import UploadDropBox from "./UploadDropBox.jsx";
import UploadActionBtn from "./UploadActionBtn.jsx";
import styles from "./UploadCard.module.css";
import { ocrScan } from "../../api/scan.js";
import { useOcrStore } from "../../store/ocrStore.js";
import { useModal } from "../../providers/useModal.js";

const UploadCard = () => {
  const [file, setFile] = useState(null);
  const [isDrag, setIsDrag] = useState(false);

  const setOcrText = useOcrStore((s) => s.setOcrText);
  const navigate = useNavigate();
  const { loading, alert } = useModal();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDrag(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleRemove = () => {
    setFile(null);
  };

  const handleCameraCapture = async (capturedFile) => {
    setFile(capturedFile);
    const close = loading("AI가 처방전 정보를 분석하고 있어요!", { title: "처방전 분석 중" });
    try {
      const text = await ocrScan(capturedFile);
      setOcrText(text);
      navigate("/ai-summary");
    } catch (err) {
      console.error(err);
      await alert("OCR 스캔에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      close();
    }
  };

  return (
    <Card radius={"sm"}>
      <p className={styles.title}>처방전 업로드</p>
      <UploadDropBox isDrag={isDrag} setIsDrag={setIsDrag} onChange={handleChange} onDrop={handleDrop} file={file} />
      <UploadActionBtn file={file} onClick={handleRemove} onCameraCapture={handleCameraCapture} />
    </Card>
  );
};

export default UploadCard;