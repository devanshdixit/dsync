import { forwardRef, useState } from "react";
import { HiOutlineClock } from "react-icons/hi";
import DatePicker from "react-datepicker";

const SelectDate = ({ setSelectedDate }: any) => {
  const [startDate, setStartDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref) => {
    setSelectedDate(value);
    return (
      <>
        {!showDate ? (
          <div ref={ref as React.RefObject<HTMLDivElement>}>
            <HiOutlineClock
              className="w-6 h-6 hover:cursor-pointer"
              onClick={onClick}
            />
          </div>
        ) : (
          <p className="text-[14px] hover:cursor-pointer" onClick={onClick}>
            {value}
          </p>
        )}
      </>
    );
  });
  ExampleCustomInput.displayName = "ExampleCustomInput";
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          if (!date) {
            return;
          }
          setStartDate(date);
        }}
        customInput={<ExampleCustomInput />}
      />
    </>
  );
};

export default SelectDate;
