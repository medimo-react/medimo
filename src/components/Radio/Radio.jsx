import { useId } from "react";
import styles from "./Radio.module.css";

function Radio({
  label,
  className = "",
  ...props
}) {
  const id = useId();

  const radioClassName = [styles.radioWrap, className]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={radioClassName} htmlFor={id}>
      <input
        id={id}
        type="radio"
        className={styles.radio}
        {...props}
      />

      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

export default Radio;