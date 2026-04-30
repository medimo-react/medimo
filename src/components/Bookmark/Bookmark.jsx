import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useBookmarkStore } from "../../store/bookmarkStore";
import styles from './Bookmark.module.css';

export default function Bookmark({ medicineId }) {
  const medicines = useBookmarkStore((s) => s.medicines);
  const addMedicine = useBookmarkStore((s) => s.addMedicine);
  const deleteMedicine = useBookmarkStore((s) => s.deleteMedicine);

  const bookmarked = medicines.find((m) => m.medicineId === medicineId);

  const handleClick = () => {
    if (bookmarked) {
      deleteMedicine(bookmarked);
    } else {
      addMedicine(medicineId);
    }
  };

  return (
    <button className={styles.bookmarkBtn} onClick={handleClick} aria-label={bookmarked ? "북마크 제거" : "북마크 추가"}>
      {bookmarked ? <BsBookmarkFill className={styles.on} /> : <BsBookmark className={styles.off} />}
    </button>
  );
}
