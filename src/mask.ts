const N = 3;

export function mask(s: string) {
  if (!s) {
    return "";
  }

  return s.slice(0, N) + "*".repeat(s.length - N * 2) + s.slice(-N);
}
