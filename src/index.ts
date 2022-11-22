import { ComponentStructure } from './lib/types';
import { parseInput } from './parseInput';

import { getFileList } from './readDir';
import { readFile } from './readFile';

const filesList: string[] = getFileList(__dirname + '/../../vue-test');
const filesContent: string[][] = [];
const parsedFiles: ComponentStructure[] = [];
filesList.forEach((file) => {
  filesContent.push([file, readFile(file)]);
});
filesContent.forEach(([fileName, content]) => {
  parsedFiles.push(parseInput(fileName, content));
});

// console.log('files', filesList);
// console.log('files Content', filesContent);
console.log('parsed', parsedFiles);
