import { storage } from '@services/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export const getFileUploaded = async (
  file: Blob | File,
  filePath: string,
  contentType: string
) => {
  const metadata = {
    contentType,
  };

  const storageRef = ref(storage, filePath);

  const uploadFile = await uploadBytesResumable(storageRef, file, metadata);
  const downloadedFile = await getDownloadURL(uploadFile.ref);

  return downloadedFile;
};
