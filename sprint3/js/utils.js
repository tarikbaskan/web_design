// Modüllerin ortak kullandığı küçük yardımcılar.

// "2026-10-12" -> "12 Ekim 2026"
export function formatDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Adres çubuğundan gelen metni HTML'e basmadan önce güvenli hale getirir.
export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}
