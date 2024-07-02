import { FC } from "react";
import { ButtonProps } from "../../utils/types";

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  className,
  icon,
  onSubmit,
  type,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick} 
      onSubmit={onSubmit}
      className={className}
      type={type}
    >
      {title}&nbsp;{icon}
    </button>
  );
};

export default Button;
