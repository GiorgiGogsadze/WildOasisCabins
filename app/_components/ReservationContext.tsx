"use client";

import { createContext, ReactNode, useContext, useState } from "react";

const initialRange = {
  from: undefined,
  to: undefined,
};

const ReservationContext = createContext(undefined as any);

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange]: [any, any] = useState(initialRange);

  function resetRange() {
    setRange(initialRange);
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
