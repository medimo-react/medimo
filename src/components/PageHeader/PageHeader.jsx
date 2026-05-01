import styles from "./PageHeader.module.css";

function PageHeader({
  title,
  description,
  action,
  className = "",
}) {
  const pageHeaderClassName = [styles.pageHeader, className]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={pageHeaderClassName}>
      <div className={styles.textBox}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {action && (
        <div className={styles.action}>
          {action}
        </div>
      )}
    </header>
  );
}

export default PageHeader;