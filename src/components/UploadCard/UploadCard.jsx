import styles from "./UploadCard.module.css";
import Card from "../Card/Card.jsx";
import UploadDropBox from "./UploadDropBox.jsx";

const UploadCard = () => {
  return (
      <Card radius={'sm'}>
        <p className={styles.title}>처방전 업로드</p>
        <UploadDropBox/>
      </Card>
  )
}

export default UploadCard;