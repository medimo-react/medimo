import { Card as RadixCard } from "@radix-ui/themes";
import styles from "./Card.module.css";

function Card({
  variant = "default",
  radius = "lg",
  padding = "md",
  clickable = false,
  className = "",
  children,
  ...props
}) {
  const radiusClassName = {
    sm: styles.radiusSm,
    md: styles.radiusMd,
    lg: styles.radiusLg,
    full: styles.radiusFull,
  }[radius];

  const paddingClassName = {
    sm: styles.paddingSm,
    md: styles.paddingMd,
    lg: styles.paddingLg,
    none: styles.paddingNone,
  }[padding];

  const cardClassName = [
    styles.card,
    styles[variant],
    radiusClassName,
    paddingClassName,
    clickable ? styles.clickable : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <RadixCard className={cardClassName} {...props}>
      {children}
    </RadixCard>
  );
}

export default Card;