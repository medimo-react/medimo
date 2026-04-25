import styles from "./Form.module.css";

function Form({
  label,
  required = false,
  error,
  children,
}) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      {children}

      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Form;