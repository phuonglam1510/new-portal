import React from "react";
import { formatMoney } from "../helpers/Number.helper";

interface Props {
  value?: string;
  onSelect: (value: number) => any;
}

const defaultValues = [10000, 5000, 100000, 200000, 5000000];

const NumberHints: React.FC<Props> = ({ onSelect, value }) => {
  const values = React.useMemo(() => {
    if (!value || isNaN(value as any)) {
      return defaultValues;
    }
    const v = Number(value);
    return [v * 10, v * 100, v * 1000, v * 10000, v * 100000];
  }, [value]);
  return (
    <div className="fv-row mt-2">
      {values.map((value) => (
        <button
          key={value}
          onClick={() => onSelect(value)}
          className="btn btn-light btn-sm"
          style={{ marginRight: "0.5rem" }}
        >
          {formatMoney(value)}
        </button>
      ))}
    </div>
  );
};

export { NumberHints };
