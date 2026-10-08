import { createContext, useContext, useMemo, useState } from "react";
import { rentalDays } from "../utils/format.js";

const RentalContext = createContext(null);

export function RentalProvider({ children }) {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const days = rentalDays(deliveryDate, pickupDate);
  const ready = days > 0;

  const value = useMemo(
    () => ({
      deliveryDate,
      pickupDate,
      days,
      ready,
      pickerOpen,
      setDeliveryDate,
      setPickupDate,
      setPickerOpen,
      applyDates: (start, end) => {
        setDeliveryDate(start);
        setPickupDate(end);
        setPickerOpen(false);
      },
      clearDates: () => {
        setDeliveryDate("");
        setPickupDate("");
      },
    }),
    [deliveryDate, pickupDate, days, ready, pickerOpen]
  );

  return <RentalContext.Provider value={value}>{children}</RentalContext.Provider>;
}

export function useRentalDates() {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error("useRentalDates must be used within RentalProvider");
  }
  return context;
}
