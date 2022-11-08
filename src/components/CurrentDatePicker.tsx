import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import DatePicker from "react-datepicker";
import { appSlice } from "../redux/appSlice";

export function CurrentDatePicker() {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | null>(new Date());

  const handleConfirmDate = () => {
    if (date === null) return;
    dispatch(appSlice.actions.setCurrentDate(date.getTime()));
  };
  return (
    <div data-testid="current-date-picker">
      <label>
        Select current date:
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
        />
      </label>
      <button onClick={handleConfirmDate}>Confirm current date</button>
    </div>
  );
}
