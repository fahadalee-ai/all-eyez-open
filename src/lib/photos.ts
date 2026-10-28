const modules = import.meta.glob("../img/generated/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const file = path.split("/").pop() ?? path.split("\\").pop() ?? "";
  const name = file.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  byName[name] = url;
}

export function photo(name: string): string | undefined {
  return byName[name];
}

export function hasPhoto(name: string): boolean {
  return Boolean(byName[name]);
}
