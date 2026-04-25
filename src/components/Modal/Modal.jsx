import { Dialog } from "@radix-ui/themes";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

function Modal({
  trigger,
  title,
  description,
  children,
  cancelText = "취소",
  confirmText = "확인",
  onConfirm,
  showFooter = true,
  className = "",
}) {
  const primaryButtonStyle = {
    backgroundColor: "var(--primary-color)",
    border: "1px solid var(--primary-color)",
    color: "var(--background-color)",
  };

  const outlineButtonStyle = {
    backgroundColor: "transparent",
    border: "1px solid var(--primary-color)",
    boxShadow: "none",
    color: "var(--primary-color)",
  };

  const contentClassName = [styles.content, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Content className={contentClassName}>
        {title && (
          <Dialog.Title className={styles.title}>
            {title}
          </Dialog.Title>
        )}

        {description && (
          <Dialog.Description className={styles.description}>
            {description}
          </Dialog.Description>
        )}

        {children && (
          <div className={styles.body}>
            {children}
          </div>
        )}

        {showFooter && (
          <div className={styles.footer}>
            <Dialog.Close asChild>
              <Button
                type="button"
                variant="outline"
                style={outlineButtonStyle}
              >
                {cancelText}
              </Button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <Button
                type="button"
                style={primaryButtonStyle}
                onClick={onConfirm}
              >
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