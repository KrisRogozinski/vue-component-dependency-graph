import { readFileSync } from 'fs';

export const readFile = (fileName: string): string => {
  let fileContent = '';
  try {
    const data = readFileSync(fileName, 'utf8');
    fileContent = data;
  } catch (err) {
    console.error(err);
  }
  return fileContent;
};
