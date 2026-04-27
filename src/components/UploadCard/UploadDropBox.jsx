import styles from "./UploadDropBox.module.css";
import { MdOutlineFileUpload } from "react-icons/md";

const UploadDropBox = () => {
  return (
      <label className={styles.drop_box}>
          <input type="file" hidden />
          <div className={styles.icon}><MdOutlineFileUpload /></div>
          <p className={styles.title}>처방전 사진을 업로드하세요</p>
          <span className={styles.desc}>
            드래그 앤 드롭 또는 클릭하여 선택
          </span>
      </label>
  )
}

export default UploadDropBox;