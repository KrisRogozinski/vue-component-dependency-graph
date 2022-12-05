import { COMPONENTS_LIST_REGEX, COMPONENTS_REGEX, COMPONENT_NAME, SCRIPT_REGEX } from './lib/constants';
import { ComponentStructure } from './lib/types';

const clearFilename = (fileName: string): string => {
  return fileName.replace(`${__dirname}`, '');
};

const buildComponentsObject = (
  fileName: string,
  name: string,
  components: string[],
  options?: Record<string, string>,
): ComponentStructure => {
  return {
    file: clearFilename(fileName),
    name: '',
    components,
    options: { ...options },
  };
};

const getComponentName = (scriptBody: string, fileName: string): string => {
  const name = '';
  const componentName = scriptBody.match(COMPONENT_NAME);
  console.log('rgx', !!componentName);
  if (!!componentName && componentName[1]) {
    console.log('c', componentName[1]);
    return componentName[1];
  }
  if (!name) {
    console.log('fn', fileName);
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
