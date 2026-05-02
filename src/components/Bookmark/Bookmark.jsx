import { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useBookmarkStore } from "../../store/bookmarkStore";
import { useModal } from "../../providers/useModal";
import styles from "./Bookmark.module.css";

export default function Bookmark({ medicineId }) {
  const [isPending, setIsPending] = useState(false);
  const modal = useModal();

  const medicines = useBookmarkStore((s) => s.medicines);
  const addMedicine = useBookmarkStore((s) => s.addMedicine);
  const deleteMedicine = useBookmarkStore((s) => s.deleteMedicine);
  const fetchBookmarks = useBookmarkStore((s) => s.fetchBookmarks);

  const bookmarked = medicines.find(
    (m) => String(m.medicineId || m.id) === String(medicineId)
  );

  const handleClick = async (e) => {
    e.stopPropagation();

    if (!medicineId || isPending) return;

    try {
      if (bookmarked) {
        const ok = await modal.confirm("북마크에서 삭제할까요?", {
          title: "북마크 삭제",
          confirmText: "삭제",
          cancelText: "취소",
          variant: "destructive",
        });

        if (!ok) return;

        setIsPending(true);
        await deleteMedicine(bookmarked);

        await modal.alert("북마크에서 삭제되었습니다.", {
          title: "삭제 완료",
        });
      } else {
        setIsPending(true);
        await addMedicine(medicineId);

        await modal.alert("북마크에 추가되었습니다.", {
          title: "저장 완료",
        });
      }
    } catch (error) {
      if (error.response?.status === 409 || error.response?.status === 404) {
        await fetchBookmarks();
      }

      await modal.alert("북마크 처리 중 문제가 발생했습니다.", {
        title: "처리 실패",
        variant: "destructive",
      });

      console.error("[BOOKMARK TOGGLE ERROR]", error.response?.data || error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.bookmarkBtn} ${bookmarked ? styles.active : ""}`}
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={Boolean(bookmarked)}
      aria-label={bookmarked ? "북마크 제거" : "북마크 추가"}
    >
      {bookmarked ? (
        <BsBookmarkFill className={styles.on} />
      ) : (
        <BsBookmark className={styles.off} />
      )}
    </button>
  );
}