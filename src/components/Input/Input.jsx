import styles from "./Input.module.css";

function Input({
  type = "text",
  className = "",
  ...props
}) {
  const inputClassName = [styles.input, className]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      type={type}
      className={inputClassName}
      {...props}
    />
  );
}

export default Input;