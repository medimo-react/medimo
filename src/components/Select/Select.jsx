import styles from "./Select.module.css";

function Select({
  options = [],
  placeholder = "선택하세요",
  className = "",
  ...props
}) {
  const selectClassName = [styles.select, className]
    .filter(Boolean)
    .join(" ");

  return (
    <select className={selectClassName} {...props}>
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;