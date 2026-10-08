export default function CTAButton({ children, onClick, type = "button", disabled }) {
  return (
    <button type={type} className="primary-btn" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
