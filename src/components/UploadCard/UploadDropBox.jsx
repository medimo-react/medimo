import styles from "./UploadDropBox.module.css";
import { MdOutlineFileUpload } from "react-icons/md";

const UploadDropBox = () => {
  return (
      <div className={styles.drop_box}>
          <div className={styles.icon}><MdOutlineFileUpload /></div>
          <p className={styles.title}>처방전 사진을 업로드하세요</p>
          <span className={styles.desc}>
            드래그 앤 드롭 또는 클릭하여 선택
          </span>
      </div>
  )
}

export default UploadDropBox;