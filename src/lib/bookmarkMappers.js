const toFolderArray = (folder) => {
  if (!folder) return [];
  if (Array.isArray(folder)) return folder.filter(Boolean);
  return [folder];
};

export const mapBookmarks = (bookmarks) => bookmarks.map((b) => {
  const med = b.medecineId || {};
  return {
    id: b._id || b.id,
    medicineId: (typeof b.medecineId === 'object' ? b.medecineId?._id : b.medecineId) || '',
    name: med.name || b.name || '',
    engName: med.normalizedName || b.engName || '',
    category: med.effect || b.category || '',
    dosage: med.dosage || b.dosage || '',
    folders: toFolderArray(b.folder),
    starred: b.starred,
    warning: (med.warning?.length ?? b.warning?.length) > 0,
    date: b.date || ''
  }
});