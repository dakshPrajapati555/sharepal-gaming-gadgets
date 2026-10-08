import { MapPin } from "lucide-react";

export default function LocationSelector() {
  return (
    <button type="button" className="chip-btn" aria-label="Location Bangalore">
      <MapPin size={16} />
      Bangalore
    </button>
  );
}
