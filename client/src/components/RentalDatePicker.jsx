import { useMemo, useState } from "react";
import { useRentalDates } from "../hooks/useRentalDates.jsx";
import { toIso } from "../utils/format.js";

function monthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const start = first.getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < start; i += 1) cells.push(null);
  for (let d = 1; d <= days; d += 1) cells.push(new Date(year, month, d));
  return cells;
}

export default function RentalDatePicker() {
  const { pickerOpen, setPickerOpen, applyDates, deliveryDate, pickupDate } = useRentalDates();
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [start, setStart] = useState(deliveryDate);
  const [end, setEnd] = useState(pickupDate);

  if (!pickerOpen) return null;

  const months = [0, 1].map((offset) => new Date(cursor.getFullYear(), cursor.getMonth() + offset, 1));

  function pick(date) {
    const iso = toIso(date);
    if (!start || (start && end)) {
      setStart(iso);
      setEnd("");
      return;
    }
    if (iso < start) {
      setStart(iso);
      setEnd("");
      return;
    }
    setEnd(iso);
  }

  return (
    <div className="overlay" role="dialog" aria-labelledby="date-title">
      <div className="modal">
        <div className="price-row">
          <h2 id="date-title">Select your Dates</h2>
          <button type="button" className="outline-btn" onClick={() => setPickerOpen(false)}>
            Close
          </button>
        </div>
        <div className="toolbar">
          <button
            type="button"
            className="outline-btn"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          >
            Previous
          </button>
          <button
            type="button"
            className="outline-btn"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          >
            Next
          </button>
        </div>
        <div className="calendars">
          {months.map((monthDate) => (
            <div key={monthDate.toISOString()}>
              <h3>
                {monthDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </h3>
              <div className="cal-grid" aria-hidden="true">
                {"Su Mo Tu We Th Fr Sa".split(" ").map((d) => (
                  <strong key={d}>{d}</strong>
                ))}
              </div>
              <div className="cal-grid">
                {monthMatrix(monthDate.getFullYear(), monthDate.getMonth()).map((date, index) => {
                  if (!date) return <span key={`e-${index}`} />;
                  const iso = toIso(date);
                  const disabled = date < today;
                  const selected = iso === start || iso === end;
                  const inRange = start && end && iso > start && iso < end;
                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={disabled}
                      className={`${selected ? "selected" : ""} ${inRange ? "in-range" : ""}`}
                      onClick={() => pick(date)}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="date-fields">
          <div>
            Delivery Date *
            <div className="muted">{start || "Select delivery date"}</div>
          </div>
          <div>
            Pickup Date *
            <div className="muted">{end || "Select pickup date"}</div>
          </div>
          <button
            type="button"
            className="primary-btn"
            disabled={!start || !end}
            onClick={() => applyDates(start, end)}
          >
            Done
          </button>
        </div>
        <p className="muted">
          Same-day delivery between 5PM and 11PM. Pickup between 9AM and 1PM.
        </p>
      </div>
    </div>
  );
}
