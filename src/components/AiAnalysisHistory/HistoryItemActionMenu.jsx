import { HiOutlineDotsHorizontal } from "react-icons/hi";
import styles from "./HistoryItemActionMenu.module.css";
import * as Popover from "@radix-ui/react-popover";
import {useAnalysisStore} from "../../store/analysisStore.js";

const HistoryItemActionMenu = ({recordId,onClick}) => {
  const pinRecords = useAnalysisStore((s) => s.pinRecords);
  const deleteRecord = useAnalysisStore((s) => s.deleteRecord);
  const records = useAnalysisStore((s) => s.records);
  const isPinned = records.find((r) => r._id === recordId)?.isPinned ?? false;

  return (
      <div className={styles.button}>
        <Popover.Root>
          <Popover.Trigger asChild>
            <HiOutlineDotsHorizontal />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content side="bottom" align="center" className={styles.popover_content}>
              <div><button onClick={onClick}>이름 변경</button></div>
              <div><button onClick={ () => pinRecords(recordId)}>{isPinned ? '상단 고정 해제' : '내역 상단 고정'}</button></div>
              <div><button onClick={() => deleteRecord(recordId)}>삭제</button></div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
  )
}

export default HistoryItemActionMenu;