import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../Card/Card.jsx";
import UploadDropBox from "./UploadDropBox.jsx";
import UploadActionBtn from "./UploadActionBtn.jsx";

import styles from "./UploadCard.module.css";

import { scanAndFetchMedicines } from "../../api/scanMedicine.js";
import { useOcrStore } from "../../store/ocrStore.js";
import { ocrScan } from "../../api/scan.js";
import {useOcrStore} from "../../store/ocrStore.js";

const UploadCard = () => {
  const [file, setFile] = useState(null);
  const [isDrag, setIsDrag] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrError, setOcrError] = useState("");

  const setOcrText = useOcrStore((s) => s.setOcrText);
  const navigate = useNavigate();

  const scanFile = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setOcrError("");
    setIsScanning(true);
    

    try {
      const result = await scanAndFetchMedicines(selectedFile);

      console.log("분석 결과:", result);

      setOcrText(result.rawText || "");

      navigate("/ai-summary", {
        state: result,
      });
    } catch (err) {
      console.error("처방전 분석 실패:", err);
      setOcrError("처방전 분석에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsScanning(false);
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
    setOcrError("");
  };

  const handleCameraCapture = async (capturedFile) => {
    setFile(capturedFile);
    setOcrError("");
    setIsScanning(true);
    try {
      const text = await ocrScan(capturedFile);
      setOcrText(text);
      navigate("/ai-summary");
    } catch (err) {
      setOcrError("OCR 스캔에 실패했습니다. 다시 시도해 주세요.");
      console.error(err);
    } finally {
      setIsScanning(false);
    }
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
        isScanning={isScanning}
      />

      {isScanning && (
        <p className={styles.ocr_status}>처방전을 분석하고 있습니다...</p>
      )}

      {ocrError && <p className={styles.ocr_error}>{ocrError}</p>}
    </Card>
  );
};

export default UploadCard;