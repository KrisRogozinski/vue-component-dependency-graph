import { readdirSync } from 'fs';
import { VUE_FILE_REGEX } from './lib/constants';

export const getFileList = (dirName: string): string[] => {
  let files = [];
  const items = readdirSync(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getFileList(`${dirName}/${item.name}`)];
    } else {
      if (VUE_FILE_REGEX.test(item.name)) {
        files.push(`${dirName}/${item.name}`);
      }
    }
  }

  return files;
};
