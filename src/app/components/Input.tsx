import React from "react";
import clsx from "clsx";

interface Props {
  disabled?: boolean;
  label: string;
  optional?: boolean;
  value?: string;
}

const Input: React.FC<Props> = ({
  disabled = false,
  label,
  optional,
  value
}) => {
  return (
    <div className="fv-row mb-7">
      <label className={clsx(!optional && "required", "fw-bold fs-6 mb-2")}>
        {label}
      </label>
      <input
        placeholder={label}
        type="text"
        className={clsx(
          "form-control form-control-solid mb-3 mb-lg-0"
        )}
        autoComplete="off"
        disabled={disabled}
        value={value}
      />
    </div>
  );
};

export { Input };
