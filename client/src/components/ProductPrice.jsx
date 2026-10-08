import { formatRupees } from "../utils/format.js";
import { useRentalDates } from "../hooks/useRentalDates.jsx";

export default function ProductPrice({ perDayRent }) {
  const { ready, days } = useRentalDates();
  const total = ready ? Number(perDayRent) * days : Number(perDayRent);
  return (
    <div>
      <div className="price">
        {formatRupees(total)} <small>{ready ? `for ${days} day${days > 1 ? "s" : ""}` : "/ day"}</small>
      </div>
      {ready ? <div className="muted">{formatRupees(perDayRent)} / day</div> : null}
    </div>
  );
}
