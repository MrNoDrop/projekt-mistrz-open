import app from "./index";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
  // connectStorageEmulator,
} from "firebase/storage";

const storage = getStorage(app);
// connectStorageEmulator(storage, "localhost", 9199);

export default {};

// upload documentation: https://firebase.google.com/docs/storage/web/upload-files?hl=pl
export const uploadFile = async (path, file, metadata = {}) => {
  return await uploadBytes(ref(storage, path), file, metadata);
};

// list documentation: https://firebase.google.com/docs/storage/web/list-files?hl=pl
export const listFiles = async (directory) => {
  return await listAll(ref(storage, directory));
};

// download documentation: https://firebase.google.com/docs/storage/web/download-files?hl=pl
export const getFileURL = async (pathToFile) => {
  return await getDownloadURL(ref(storage, pathToFile));
};

// delete documentation: https://firebase.google.com/docs/storage/web/delete-files?hl=pl
export const deleteFile = async (pathToFile) => {
  return await deleteObject(ref(storage, pathToFile));
};
