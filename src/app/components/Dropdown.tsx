import React from "react";
import clsx from "clsx";

export interface DropdownItemProps {
  value: string | number;
  text: string;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItemProps[];
  disabled?: boolean;
  label: string;
  placeholder?: string;
  optional?: boolean;
  selectProps?: any;
  value?: string | number;
  onChange?: (value: string | number) => any;
}

const Dropdown: React.FC<DropdownProps> = ({
  disabled = false,
  label,
  optional,
  placeholder = "Select...",
  items,
  selectProps,
  value,
  onChange = () => true,
}) => {
  return (
    <div className="fv-row mb-7">
      <label className={clsx(!optional && "required", "fw-bold fs-6 mb-2")}>
        {label}
      </label>
      <div className="mb-3 mb-lg-0">
        <select
          className="form-select form-select-solid form-select-lg"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          {...selectProps}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {items.map((item) => (
            <option
              disabled={item.disabled}
              key={item.value}
              value={item.value}
            >
              {item.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { Dropdown };
