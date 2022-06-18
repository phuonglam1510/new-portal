import React from "react";

export interface SelectListItemProps {
  value: string | number;
  text: string;
  subText: string;
  checked: boolean;
  inputProps?: any;
  onClick: () => void;
  disabled?: boolean;
}

export interface ListItemProps {
  value: string | number;
  text: string;
  subText: string;
  disabled?: boolean;
}

export interface SelectListProps {
  items: ListItemProps[];
  inputProps?: any;
  label: string;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  value?: string | number;
}

const SelectItem: React.FC<SelectListItemProps> = ({
  value,
  text,
  subText,
  checked,
  inputProps = {},
  onClick,
  disabled = false,
}) => {
  return (
    <>
      <div className="d-flex fv-row">
        <div className="form-check form-check-custom form-check-solid">
          <input
            className="form-check-input me-3"
            {...inputProps}
            name="role"
            type="radio"
            value={value}
            id="kt_modal_update_role_option_0"
            checked={checked}
            onChange={onClick}
            disabled={disabled}
          />

          <label
            className="form-check-label"
            htmlFor="kt_modal_update_role_option_0"
          >
            <div className="fw-bolder text-gray-800">{text}</div>
            <div className="text-gray-600">{subText}</div>
          </label>
        </div>
      </div>
      <div className="separator separator-dashed my-5"></div>
    </>
  );
};

const SelectList: React.FC<SelectListProps> = ({
  items,
  inputProps = {},
  label,
  onChange = () => {},
  disabled = false,
  value,
}) => {
  return (
    <div className="mb-7">
      <label className="required fw-bold fs-6 mb-5">{label}</label>
      {items.map((item) => (
        <SelectItem
          {...item}
          key={`item-${item.value}`}
          inputProps={inputProps}
          onClick={() => onChange(item.value)}
          disabled={disabled}
          checked={item.value === value}
        />
      ))}
    </div>
  );
};

export { SelectList, SelectItem };
