import { FC } from "react";
import { Input } from "../../utils/types";

const Input: FC<Input> = ({
  title,
  placeholder,
  type,
  className,
  required,
  name,
  onChange,
  labelClass,
  icon,
  onBlur,
  value,
  onSubmit,
  onkeyDown,
}) => {
  return (
    <>
      <label className={labelClass ? labelClass : "mb-1"}>{title}</label>
      <input
        onSubmit={onSubmit}
        onKeyDown={onkeyDown}
        onBlur={onBlur}
        type={type ? type : "text"}
        name={name}
        className={className}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
      />
      {icon}
    </>
  );
};

export default Input;
