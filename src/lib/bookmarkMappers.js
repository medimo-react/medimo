const cleanDisplayName = (value = "") =>
  String(value)
    .replace(/\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const toFolderArray = (folder) => {
  if (!folder) return [];
  if (Array.isArray(folder)) return folder.filter(Boolean);
  return [folder];
};

export const mapBookmarks = (bookmarks = []) =>
  bookmarks.map((b) => {
    const medicineId = b.id || "";

    return {
      id: String(medicineId),
      medicineId: String(medicineId),

      // 큰 글씨용: 원본 이름 그대로
      name: b.name || "",

      // 작은 글씨용: 괄호 제거된 이름
      normalizedName:
        b.normalizedName || cleanDisplayName(b.name || "") || "",
      engName:
        b.normalizedName || b.engName || cleanDisplayName(b.name || "") || "",

      category: b.category || "",
      dosage: b.dosage || b.usage || "",
      folders: toFolderArray(b.folder),
      starred: b.starred ?? false,
      warning: Boolean(b.warning),
      date: b.date || "",
    };
  });