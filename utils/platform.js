export default function detectPlatform() {
  const platform = process.platform;

  switch (platform) {
    case "win32":
      return "windows";
    case "darwin":
      return "mac";
    case "linux":
      return "linux";
    default:
      throw new Error(`We don't work with ${platform} platform`);
  }
}
