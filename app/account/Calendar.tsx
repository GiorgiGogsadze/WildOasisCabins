"use client";
import { DayPicker } from "react-day-picker/utc";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import { UTCDate } from "@date-fns/utc";
import { addMonths } from "date-fns";
type CalendarProps = {
  bookedDates: any;
};
export default function Calendar({ bookedDates }: CalendarProps) {
  const minDate = bookedDates.reduce(
    (acc: any, el: any) => (el < acc ? el : acc),
    new UTCDate()
  );
  const [curMonth, setCurMonth] = useState(new UTCDate(minDate));
  const selectDates = bookedDates.map((el: any) => new UTCDate(el));

  return (
    <div className="flex flex-col items-center gap-8">
      <DayPicker
        mode="multiple"
        className="pt-12 place-self-center calendar"
        selected={selectDates}
        captionLayout="dropdown"
        endMonth={new UTCDate(new UTCDate().getFullYear() + 5, 0)}
        numberOfMonths={4}
        month={curMonth}
        onMonthChange={(a: any) => setCurMonth(a)}
      />
      <button
        className="bg-accent-500 px-4 py-2 text-primary-800 font-semibold hover:bg-accent-600 transition-all"
        onClick={() => setCurMonth(new UTCDate())}
      >
        Go to Today
      </button>
    </div>
  );
}
