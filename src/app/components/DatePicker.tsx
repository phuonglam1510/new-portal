import React, { useRef } from "react";
import clsx from "clsx";
import moment from "moment";

export interface DatePickerProps {
  disabled?: boolean;
  label: string;
  optional?: boolean;
  value?: string;
  key: string;
  onChange?: (value: string) => void;
}

declare var $: any;

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  optional,
  value,
  key,
  onChange = () => true,
}) => {
  const ref = useRef<any>();
  const initDaterangepicker = () => {
    var start = value ? moment(value) : moment();
    var end = moment();
    var input = $(ref.current);

    function onChangeCallback(start: moment.Moment, end: moment.Moment) {
      input.html(
        start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
      );
      onChange(start.toISOString());
    }

    (input as any).daterangepicker(
      {
        startDate: start,
        endDate: end,
        singleDatePicker: true,
        showDropdowns: true,
        ranges: {
          Today: [moment()],
          Yesterday: [moment().subtract(1, "days")],
          "Last 7 Days": [moment().subtract(6, "days")],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Last Month": [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month"),
          ],
        },
      },
      onChangeCallback
    );

    onChangeCallback(start, end);
  };

  React.useEffect(() => {
    setTimeout(() => {
      initDaterangepicker();
    }, 1000);
  }, []);

  return (
    <div className="fv-row mb-7">
      <label className={clsx(!optional && "required", "fw-bold fs-6 mb-2")}>
        {label}
      </label>
      <input
        className="form-control form-control-solid w-100 mw-250px"
        placeholder="Pick date range"
        ref={ref}
      />
    </div>
  );
};

export { DatePicker };
