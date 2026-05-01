import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card.jsx";
import UploadDropBox from "./UploadDropBox.jsx";
import UploadActionBtn from "./UploadActionBtn.jsx";
import styles from "./UploadCard.module.css";
import { scanAndFetchMedicines } from "../../api/scanMedicine.js";
import { useOcrStore } from "../../store/ocrStore.js";
import { useModal } from "../../providers/useModal.js";

const UploadCard = () => {
  const [file, setFile] = useState(null);
  const [isDrag, setIsDrag] = useState(false);

  const setOcrText = useOcrStore((s) => s.setOcrText);
  const navigate = useNavigate();
  const { loading, alert } = useModal();

  const scanFile = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    const close = loading("AI가 처방전 정보를 분석하고 있어요!", { title: "처방전 분석 중" });

    try {
      const result = await scanAndFetchMedicines(selectedFile);

      console.log("분석 결과:", result);

      // OCR 원문만 저장하는 게 아니라 전체 분석 결과 저장
      setOcrText(result);

      navigate("/ai-summary");
    } catch (err) {
      console.error("처방전 분석 실패 상세:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        url: err.config?.url,
      });

      await alert("처방전 분석에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      close();
    }
  };

  const handleChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    await scanFile(selectedFile);
    e.target.value = "";
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDrag(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    await scanFile(droppedFile);
  };

  const handleRemove = () => {
    setFile(null);
  };

  const handleCameraCapture = async (capturedFile) => {
    await scanFile(capturedFile);
  };

  return (
    <Card radius={"sm"}>
      <p className={styles.title}>처방전 업로드</p>

      <UploadDropBox
        isDrag={isDrag}
        setIsDrag={setIsDrag}
        onChange={handleChange}
        onDrop={handleDrop}
        file={file}
      />

      <UploadActionBtn
        file={file}
        onClick={handleRemove}
        onCameraCapture={handleCameraCapture}
      />
      <UploadDropBox isDrag={isDrag} setIsDrag={setIsDrag} onChange={handleChange} onDrop={handleDrop} file={file} />
      <UploadActionBtn file={file} onClick={handleRemove} onCameraCapture={handleCameraCapture} />
    </Card>
  );
};

export default UploadCard;