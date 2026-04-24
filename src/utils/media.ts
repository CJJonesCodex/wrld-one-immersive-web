export function pickMediaSource(webm?: string, mp4?: string): string | null {
  return webm ?? mp4 ?? null;
}
