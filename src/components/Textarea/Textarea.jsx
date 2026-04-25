import styles from "./Textarea.module.css";

function Textarea({
  className = "",
  rows = 4,
  ...props
}) {
  const textareaClassName = [styles.textarea, className]
    .filter(Boolean)
    .join(" ");

  return (
    <textarea
      className={textareaClassName}
      rows={rows}
      {...props}
    />
  );
}

export default Textarea;