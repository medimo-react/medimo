import { useId } from "react";
import styles from "./Checkbox.module.css";

function Checkbox({
  label,
  className = "",
  ...props
}) {
  const id = useId();

  const checkboxClassName = [styles.checkboxWrap, className]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={checkboxClassName} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className={styles.checkbox}
        {...props}
      />

      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

export default Checkbox;