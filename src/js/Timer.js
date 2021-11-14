export default function Timer(s) {
  const h = Math.floor(s / 60 / 60);
  const m = Math.floor((s / 60) - (h * 60));
  const sec = s % 60;

  const formatted = [
    h.toString().padStart(2, '0'),
    m.toString().padStart(2, '0'),
    sec.toString().padStart(2, '0'),
  ].join(':');

  return formatted;
}
