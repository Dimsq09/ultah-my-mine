export function getAssetPath(src: string | null | undefined): string {
  if (!src) return "";
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  const cleanPath = src.startsWith("/") ? src : `/${src}`;

  if (typeof window !== "undefined") {
    if (
      window.location.pathname.startsWith("/ultah-my-mine") &&
      !cleanPath.startsWith("/ultah-my-mine")
    ) {
      return `/ultah-my-mine${cleanPath}`;
    }
  }

  return cleanPath;
}
