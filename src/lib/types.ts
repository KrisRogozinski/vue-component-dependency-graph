export declare interface Options {
  parseElement: ['imports', 'components']; // components by default
}

export declare interface ComponentStructure {
  file: string;
  name: string;
  components: string[];
  dir?: string;
  options?: { [key: string]: string };
  children?: ComponentStructure[];
}
