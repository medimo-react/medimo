import styles from "./Badge.module.css";

function Badge({
  children,
  variant = "primary",
  size = "md",
  outline = false,
  className = "",
  ...props
}) {
  
  const Badge = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={`
        ${styles.badge}
        ${styles[variant]}
        ${styles[size]}
        ${outline ? styles.outline : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
