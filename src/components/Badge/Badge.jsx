import styles from "./Badge.module.css";

function Badge({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) {
  const badgeClassName = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClassName} {...props}>
      {children}
    </span>
  );
}

export default Badge;