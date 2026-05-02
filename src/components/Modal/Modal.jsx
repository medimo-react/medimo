import { Dialog } from "@radix-ui/themes";
import { MdOutlineCheckCircle, MdOutlineInfo, MdOutlineWarningAmber } from "react-icons/md";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

const ICONS = {
  confirm: <MdOutlineCheckCircle />,
  info: <MdOutlineInfo />,
  warning: <MdOutlineWarningAmber />,
};

function Modal({
  trigger,
  open,
  onOpenChange,
  iconType,
  title,
  description,
  children,
  showFooter = true,
  showCancel = true,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  disableClose = false,
  variant = "default",
  className = "",
}) {
  const contentClassName = [styles.content, className].filter(Boolean).join(" ");

  const confirmStyle =
    variant === "destructive"
      ? {
          backgroundColor: "var(--danger-color, #ef4444)",
          border: "1px solid var(--danger-color, #ef4444)",
          color: "var(--background-color)",
        }
      : {
          backgroundColor: "var(--primary-color)",
          border: "1px solid var(--primary-color)",
          color: "var(--background-color)",
        };

  const cancelStyle = {
    backgroundColor: "transparent",
    border: "1px solid var(--primary-color)",
    boxShadow: "none",
    color: "var(--primary-color)",
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Content
        className={contentClassName}
        onInteractOutside={(e) => disableClose && e.preventDefault()}
        onEscapeKeyDown={(e) => disableClose && e.preventDefault()}
      >
        {iconType && (
          <div className={`${styles.iconWrap} ${styles[iconType]}`}>
            {iconType === "loading" ? (
              <div className={styles.spinner} />
            ) : (
              ICONS[iconType]
            )}
          </div>
        )}

        {title && (
          <Dialog.Title className={`${styles.title} ${iconType ? styles.centered : ""}`}>
            {title}
          </Dialog.Title>
        )}

        {description && (
          <Dialog.Description className={`${styles.description} ${iconType ? styles.centered : ""}`}>
            {description}
          </Dialog.Description>
        )}

        {children && <div className={styles.body}>{children}</div>}

        {showFooter && (
          <div className={styles.footer}>
            {showCancel && (
              <Dialog.Close asChild>
                <Button
                  type="button"
                  variant="outline"
                  style={cancelStyle}
                  onClick={onCancel}
                >
                  {cancelText}
                </Button>
              </Dialog.Close>
            )}
            <Dialog.Close asChild>
              <Button type="button" style={confirmStyle} onClick={onConfirm}>
                {confirmText}
              </Button>
            </Dialog.Close>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default Modal;
