import { createContext, useState } from "react";
import Modal from "../components/Modal/Modal";

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const dismiss = (value) => {
    modal?.resolve?.(value);
    setModal(null);
  };

  const confirm = (message, options = {}) =>
    new Promise((resolve) => {
      setModal({ type: "confirm", message, options, resolve });
    });

  const alert = (message, options = {}) =>
    new Promise((resolve) => {
      setModal({ type: "alert", message, options, resolve });
    });

  const loading = (message, options = {}) => {
    setModal({ type: "loading", message, options });
    return () => setModal(null);
  };

  return (
    <ModalContext.Provider value={{ confirm, alert, loading }}>
      {children}
      {modal && (
        <Modal
          open={true}
          onOpenChange={(open) => { if (!open) dismiss(false); }}
          iconType={
            modal.type === "loading" ? "loading"
            : modal.type === "alert" ? "info"
            : modal.options?.variant === "destructive" ? "warning"
            : "confirm"
          }
          title={modal.options?.title ?? (
            modal.type === "loading" ? "잠시만 기다려주세요"
            : modal.type === "alert" ? "안내"
            : modal.options?.variant === "destructive" ? "주의"
            : "확인"
          )}
          description={modal.message}
          showFooter={modal.type !== "loading"}
          showCancel={modal.type === "confirm"}
          confirmText={modal.options?.confirmText ?? "확인"}
          cancelText={modal.options?.cancelText ?? "취소"}
          variant={modal.options?.variant ?? "default"}
          disableClose={modal.type === "loading"}
          onConfirm={() => dismiss(true)}
          onCancel={() => dismiss(false)}
        />
      )}
    </ModalContext.Provider>
  );
}

