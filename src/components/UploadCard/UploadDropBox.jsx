import styles from "./UploadDropBox.module.css";
import { MdOutlineFileUpload } from "react-icons/md";

const UploadDropBox = ({onChange, onDrop, file, isDrag, setIsDrag}) => {
  return (
      <label className={`${styles.drop_box} ${isDrag ? styles.active : ''}`}
             onDrop={onDrop}
             onDragOver={(e) => {
                e.preventDefault();
                setIsDrag(true);
             }}
             onDragLeave={() => setIsDrag(false)}>
        <input type="file" hidden onChange={onChange} capture="environment" />
        <div className={styles.icon}><MdOutlineFileUpload /></div>
        { !file ? (
              <>
                <p className={styles.title}>처방전 사진을 업로드하세요</p>
                <span className={styles.desc}>
                  드래그 앤 드롭 또는 클릭하여 선택
                </span>
              </>
          ): <p className={styles.file_name}>{file.name}</p>
        }
      </label>
  )
}

export default UploadDropBox;