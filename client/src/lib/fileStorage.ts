export interface StoredFileRecord {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: string;
  sizeBytes: number;
  extension: string;
  version: number;
  previewUrl: string;
  downloadUrl: string;
  uploadedBy: string;
  driveFolderId?: string;
  createdAt: string;
  updatedAt: string;
}

export const inMemoryFileStore: StoredFileRecord[] = [
  {
    id: 'file-101',
    name: 'The_Silent_Echo_Final_Print_Cover.pdf',
    originalName: 'The_Silent_Echo_Final_Print_Cover.pdf',
    mimeType: 'application/pdf',
    size: '14.5 MB',
    sizeBytes: 15204352,
    extension: 'pdf',
    version: 2,
    previewUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    downloadUrl: '/uploads/The_Silent_Echo_Final_Print_Cover.pdf',
    uploadedBy: 'Eleanor Vance',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'file-102',
    name: 'Startup_Unlocked_Manuscript.docx',
    originalName: 'Startup_Unlocked_Manuscript.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: '2.1 MB',
    sizeBytes: 2202009,
    extension: 'docx',
    version: 1,
    previewUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop',
    downloadUrl: '/uploads/Startup_Unlocked_Manuscript.docx',
    uploadedBy: 'Marcus Sterling',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export function processFileUpload(
  fileName: string,
  fileSizeBytes: number,
  mimeType: string,
  uploadedBy: string,
  fileUrl?: string
): StoredFileRecord {
  const ext = fileName.split('.').pop()?.toLowerCase() || 'dat';
  const sizeMb = (fileSizeBytes / (1024 * 1024)).toFixed(2);

  // Check if file with same name already exists for versioning!
  const existing = inMemoryFileStore.find(f => f.name === fileName);
  const version = existing ? existing.version + 1 : 1;

  const record: StoredFileRecord = {
    id: `file-${Date.now()}`,
    name: fileName,
    originalName: fileName,
    mimeType,
    size: `${sizeMb} MB`,
    sizeBytes: fileSizeBytes,
    extension: ext,
    version,
    previewUrl: fileUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    downloadUrl: fileUrl || `#download-${fileName}`,
    uploadedBy,
    createdAt: existing ? existing.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (existing) {
    const idx = inMemoryFileStore.findIndex(f => f.id === existing.id);
    inMemoryFileStore[idx] = record;
  } else {
    inMemoryFileStore.unshift(record);
  }

  return record;
}

export function getAllStoredFiles() {
  return inMemoryFileStore;
}
