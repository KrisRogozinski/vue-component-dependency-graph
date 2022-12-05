export const SCRIPT_REGEX = /<script(?<scriptAttr>[^>]*)?>(?<content>.*?)<\/script>/s;
export const COMPONENT_NAME = /name:\s'([A-Z]+[a-zA-Z]*)',/;
export const COMPONENTS_REGEX = /components: {.*?}[;,]?/s;
export const COMPONENTS_LIST_REGEX = /([A-Z]{1,2}[a-zA-Z]{1,})/g; //([a-zA-Z]+)[^,|:|\n]
export const VUE_FILE_REGEX = /(.*[^.spec]\.vue)/;
export const COMPONENT_FILE_NAME = /([a-zA-Z-]+)(?:\.vue{1})/; // /components/organisms/o-accordion-item.vue
export const COMPONENT_DYNAMIQ_IMPORT_PATH = /~\/[\w-/.]+/; // ~/components/AppFooter.vue
export const COMPONENT_IS_DYNAMIQ = /(\(\)[\s]*(=>)[\s]*import\(.+\))/; // AppFooter: () => import(/* webpackPrefetch: true */ '~/components/AppFooter.vue'),
export const IMPORT_STATEMENT = /^import\s([\w])+\sfrom\s['|"](\w)+['|"];/; //import AIcon from 'cokolwiek';
