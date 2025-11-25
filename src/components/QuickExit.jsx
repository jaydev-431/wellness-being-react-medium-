export default function QuickExit() {
  return (
    <button
      className="quick-exit"
      onClick={() => (window.location.href = "https://www.google.com")}
    >
      <i className="fas fa-door-open"></i> Quick Exit
    </button>
  );
}
