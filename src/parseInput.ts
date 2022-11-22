import { COMPONENTS_LIST_REGEX, COMPONENTS_REGEX, SCRIPT_REGEX } from './lib/constants';
import { ComponentStructure } from './lib/types';

const buildComponentsObject = (
  fileName: string,
  components: string[],
  options?: Record<string, string>,
): ComponentStructure => {
  return {
    file: fileName,
    components,
    options: { ...options },
  };
};

export const parseInput = (fileName: string, input: string): ComponentStructure => {
  try {
    const result = input.match(SCRIPT_REGEX);
    const components = result.groups.content.match(COMPONENTS_REGEX);
    const componentsList = components && components.length > 0 ? components[0].match(COMPONENTS_LIST_REGEX) : [];
    return buildComponentsObject(fileName, componentsList || []);
  } catch (e) {
    console.log('err', fileName, input, e);
  }
};
