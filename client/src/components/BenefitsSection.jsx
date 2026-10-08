import { ShieldCheck, Sparkles, Truck, Zap } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <ShieldCheck size={28} style={{ color: "#7c3aed" }} />,
      iconBg: "#ede9fe",
      title: "Zero Deposit",
      text: "Rent top-tier gaming consoles & VR gear without blocking security deposit money.",
    },
    {
      icon: <Truck size={28} style={{ color: "#2563eb" }} />,
      iconBg: "#dbeafe",
      title: "Doorstep Delivery",
      text: "Fast delivery & scheduled pickup in Bangalore at your convenient time slot.",
    },
    {
      icon: <Zap size={28} style={{ color: "#d97706" }} />,
      iconBg: "#fef3c7",
      title: "Flexible Tenure",
      text: "Rent for a weekend, a week, or a month. Pay only for the days you play.",
    },
    {
      icon: <Sparkles size={28} style={{ color: "#16a34a" }} />,
      iconBg: "#dcfce7",
      title: "Verified Quality",
      text: "100% sanitized, quality checked, and pre-tested consoles with top games.",
    },
  ];

  return (
    <section className="benefits-section" id="benefits">
      <h2 className="benefits-title">Why Rent From SharePal?</h2>
      <div className="benefits-grid">
        {benefits.map((item, idx) => (
          <div className="benefit-card" key={idx}>
            <div className="benefit-icon-wrap" style={{ background: item.iconBg }}>{item.icon}</div>
            <h3 className="benefit-card-title">{item.title}</h3>
            <p className="benefit-card-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
