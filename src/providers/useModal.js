import { useContext } from "react";
import { ModalContext } from "./ModalContext.js";

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal은 ModalProvider 안에서 사용해야 합니다.");
  return context;
}
