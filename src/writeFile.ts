import { writeFile } from 'fs';
import { ComponentStructure } from './lib/types';

const fileSaveError = (err) => {
  if (err) {
    console.error(err);
  }
  console.log('File saved successfully');
};

export const saveDataToFile = (fileName: string, data: ComponentStructure[]) => {
  writeFile(fileName, JSON.stringify(data), fileSaveError);
};
