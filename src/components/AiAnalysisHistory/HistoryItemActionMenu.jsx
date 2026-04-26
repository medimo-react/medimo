import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import styles from "./HistoryItemActionMenu.module.css";

const HistoryItemActionMenu = () => {
  return (
      <div className={styles.button}>
        <DotsHorizontalIcon/>
      </div>
  )
}

export default HistoryItemActionMenu;