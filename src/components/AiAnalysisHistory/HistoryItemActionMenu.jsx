import { HiOutlineDotsHorizontal } from "react-icons/hi";
import styles from "./HistoryItemActionMenu.module.css";
import * as Popover from "@radix-ui/react-popover";

const HistoryItemActionMenu = () => {
  return (
      <div className={styles.button}>
        <Popover.Root>
          <Popover.Trigger asChild>
            <HiOutlineDotsHorizontal />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content side="bottom" align="center" className={styles.popover_content}>
              <div><button>이름 변경</button></div>
              <div><button>내역 고정</button></div>
              <div><button>삭제</button></div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
  )
}

export default HistoryItemActionMenu;