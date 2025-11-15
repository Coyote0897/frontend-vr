export function formatearTiempo(segundos) {
  const mins = Math.floor(segundos / 60);
  const secs = (segundos % 60).toFixed(2);

  if (mins > 0) {
    return `${mins}:${secs.padStart(5, "0")}`; // 1:08.45
  }

  return `${secs}s`; // 58.22s
}
