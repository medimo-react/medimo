import { forwardRef } from "react";
import { Button as RadixButton } from "@radix-ui/themes";
import styles from "./Button.module.css";

const Button = forwardRef(function Button(
  {
    type = "button",
    size = "normal",
    className = "",
    children,
    ...props
  },
  ref
) {
  const buttonClassName = [
    styles.button,
    styles[size],
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