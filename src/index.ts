import { ComponentStructure } from './lib/types';
import { parseInput, prepareTree } from './parseInput';
import { getFileList } from './readDir';
import { readFile } from './readFile';
import { saveDataToFile } from './writeFile';

const filesList: string[] = getFileList(`${__dirname}`);
const filesContent: string[][] = [];
const parsedFiles: ComponentStructure[] = [];
filesList.forEach((file) => {
  filesContent.push([file, readFile(file)]);
});
filesContent.forEach(([fileName, content]) => {
  parsedFiles.push(parseInput(fileName, content));
});

const tree = prepareTree(parsedFiles);

saveDataToFile('parsedFiles.json', parsedFiles);
saveDataToFile('tree.json', tree);
