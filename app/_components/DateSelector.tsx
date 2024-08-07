"use client";
import { differenceInDays, isWithinInterval } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(range: any, datesArr: Date[]) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

type DateSelectorProps = {
  settings: { minBookingLength: number; maxBookingLength: number };
  bookedDates: Date[];
  cabin: cabinType;
};

const initialRange = {
  from: undefined,
  to: undefined,
};

export default function DateSelector({
  settings,
  bookedDates,
  cabin,
}: DateSelectorProps) {
  console.log("nono");
  const [range, setRange]: [any, any] = useState(initialRange);

  function resetRange() {
    setRange(initialRange);
  }

  // const numNights = range.to.getdate() - range.to.getdate();
  const { regularPrice, discount = 0 } = cabin;
  const numNights = differenceInDays(range.to, range.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between gap-2">
      <p className="text-center text-lg">
        minimum number of nights: {minBookingLength} | maximum:{" "}
        {maxBookingLength}
      </p>
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        disabled={bookedDates}
        onSelect={(r) => {
          const nr = { from: r?.from, to: r?.to ?? r?.from };
          isAlreadyBooked(r, bookedDates)
            ? setRange({ from: undefined, to: undefined })
            : setRange(nr);
        }}
        selected={range}
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={new Date()}
        hidden={{ before: new Date() }}
        endMonth={new Date(new Date().getFullYear() + 5, 0)}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
