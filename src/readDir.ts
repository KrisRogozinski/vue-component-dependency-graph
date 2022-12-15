import { readdirSync } from 'fs';
import { COMPONENT_FILE_NAME } from './lib/constants';

const excludeDirs = ['node_modules', '.nuxt'];

export const getFileList = (dirName: string): string[] => {
  let files = [];
  const items = readdirSync(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory() && !excludeDirs.includes(item.name)) {
      files = [...files, ...getFileList(`${dirName}/${item.name}`)];
    } else {
      if (COMPONENT_FILE_NAME.test(item.name)) {
        files.push(`${dirName}/${item.name}`);
      }
    }
  }

  return files;
};
