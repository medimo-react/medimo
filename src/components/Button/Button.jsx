import { forwardRef } from "react";
import { Button as RadixButton } from "@radix-ui/themes";
import styles from "./Button.module.css";

const Button = forwardRef(function Button(
  {
    type = "button",
    variant = "primary",
    size = "normal",
    className = "",
    children,
    ...props
  },
  ref,
) {
  const variantClassName = {
    primary: styles.primary,
    outline: styles.outline,
  }[variant];

  const sizeClassName = {
    normal: styles.normal,
    small: styles.small,
  }[size];

  const buttonClassName = [
    styles.button,
    variantClassName,
    sizeClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <RadixButton
      ref={ref}
      type={type}
      className={buttonClassName}
      {...props}
    >
      {children}
    </RadixButton>
  );
});

export default Button;