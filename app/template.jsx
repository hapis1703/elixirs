// Remount tiap navigasi route → animasi masuk halaman (CSS murni).
// ponytail: entrance-only; exit animation butuh View Transitions API, tambah kalau perlu.
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}
