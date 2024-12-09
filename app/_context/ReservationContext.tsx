"use client";
import { createContext, useState } from "react";

// Define the range type
type Range = { from: Date | null; to: Date | null };

// Define the context type
type ReservationContextType = {
  range: Range;
  setRange: (range: Range) => void;
  resetRange: () => void;
};

// Create the context with a default value
const ReservationContext = createContext<ReservationContextType>({
  range: { from: null, to: null },
  setRange: () => {
    // Default implementation (does nothing)
  },
  resetRange: () => {
    // Default implementation (does nothing)
  },
});

// Initial state for the range
const initState: Range = {
  from: null,
  to: null,
};

// ReservationProvider component
export function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<Range>(initState);

  // Function to update the range
  const changeRange = (newRange: Range) => {
    setRange(newRange);
  };

  // Function to reset the range
  const resetRange = () => {
    setRange(initState);
  };

  // Context value to be provided
  const contextValue: ReservationContextType = {
    range,
    setRange: changeRange,
    resetRange,
  };

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
}

export default ReservationContext;
