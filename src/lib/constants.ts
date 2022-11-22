export const SCRIPT_REGEX = /<script(?<scriptAttr>[^>]*)?>(?<content>.*?)<\/script>/s;
export const COMPONENTS_REGEX = /components: {.*?}[;,]?/s;
export const COMPONENTS_LIST_REGEX = /([A-Z]{1,2}[a-zA-Z]{1,})/g;
