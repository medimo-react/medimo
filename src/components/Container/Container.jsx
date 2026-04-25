import styles from "./Container.module.css";

function Container({ children, className = "" }) {
  const containerClassName = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return <div className={containerClassName}>{children}</div>;
}

export default Container;