import {
  COMPONENTS_LIST_REGEX,
  COMPONENTS_REGEX,
  COMPONENT_FILE_NAME,
  COMPONENT_NAME,
  SCRIPT_REGEX,
} from './lib/constants';
import { ComponentStructure } from './lib/types';
import path from 'path';
import { saveDataToFile } from './writeFile';

const clearFilename = (fileName: string): string => {
  // return fileName.replace(`${__dirname}`, '');
  const name = fileName.replace('', '');
  const parsed = path.parse(name);
  return `${parsed.dir}/${parsed.name}${parsed.ext}`;
};

const buildComponentsObject = (
  fileName: string,
  name: string,
  components?: string[],
  options?: Record<string, string>,
): ComponentStructure => {
  return {
    file: clearFilename(fileName),
    name: name,
    components,
    options: { ...options },
  };
};

const getComponentName = (scriptBody: string, fileName: string): string => {
  const componentName = scriptBody.match(COMPONENT_NAME);
  if (!!componentName && componentName[1]) {
    return componentName[1];
  }
  const file = fileName.match(COMPONENT_FILE_NAME);
  if (file) {
    return file[1]
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  return '';
};

export const parseInput = (fileName: string, input: string): ComponentStructure => {
  try {
    const result = input.match(SCRIPT_REGEX);

    const name = getComponentName(result.groups.content, fileName);
    const components = result.groups.content.match(COMPONENTS_REGEX);
    const componentsList = components && components.length > 0 ? components[0].match(COMPONENTS_LIST_REGEX) : [];
    return buildComponentsObject(fileName, name, componentsList || []);
  } catch (e) {
    console.log('err', fileName, input, e);
  }
};

export const buildComponentTree = (
  originalInput: ComponentStructure[],
  input: ComponentStructure[],
): ComponentStructure[] => {
  const treeObject: ComponentStructure[] = [];
  input.filter(Boolean).forEach((component: ComponentStructure) => {
    if (component.components && component.components.length === 0) {
      treeObject.push(component);
      return;
    }
    const innerComponent: ComponentStructure = { ...component, children: [] };
    component.components.forEach((element: string) => {
      const findComponent = originalInput.filter(Boolean).find((i) => i.name === element);
      if (findComponent) {
        if (findComponent.components.length === 0) {
          innerComponent.children.push(findComponent);
        } else {
          innerComponent.children.push(...buildComponentTree(originalInput, [findComponent]));
        }
      } else {
        innerComponent.children.push(buildComponentsObject('Not found', element, []));
      }
    });
    treeObject.push(innerComponent);
  });
  return treeObject;
};

const sortTree = (tree: ComponentStructure[], dependencyTree: ComponentStructure[]): ComponentStructure[] => {
  const paths = tree.map((component) => component.file);
  console.log('paths', paths);
  const result = [];
  const level = { result };

  paths.forEach((path) => {
    path.split('/').reduce((r, name, i, a) => {
      if (!r[name]) {
        r[name] = { result: [] };
        const componentName = getComponentName('', name);
        if (componentName) {
          console.log('componentName',path, componentName, name);
          r.result.push({
            ...dependencyTree.find((branch) => branch.file === path),
          });
        } else {
          r.result.push({
            file: name,
            name: componentName,
            dir: name,
            children: r[name].result,
            components: [],

          });
        }
      }

      return r[name];
    }, level);
  });
  // tree.forEach((component) => {
  //   result.find((i) => i.name === component.name).children.push(component);
  // });
  return result;
};

export const prepareTree = (input: ComponentStructure[]): ComponentStructure => {
  const root = {
    file: 'root',
    name: 'root',
    components: [],
    children: [],
  };
  const treeObject: ComponentStructure[] = buildComponentTree(input, input);
  const sortedByPath = sortTree(input, treeObject);
  saveDataToFile('sorted.json', sortedByPath[0]);



  root.children = treeObject;

  return root;
};
