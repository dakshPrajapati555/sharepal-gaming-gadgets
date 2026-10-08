import { Star } from "lucide-react";

export default function Rating({ value, bookedCount }) {
  const numeric = Number(value);
  return (
    <div className="rating-row">
      <span className="rating">
        <Star size={16} fill={numeric ? "#f5a524" : "none"} color="#f5a524" />
        {numeric ? numeric.toFixed(1) : "New"}
      </span>
      <span className="muted">{bookedCount} booked</span>
    </div>
  );
}
