import styles from "./Badge.module.css";

function Badge({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) {
  const Badge = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
