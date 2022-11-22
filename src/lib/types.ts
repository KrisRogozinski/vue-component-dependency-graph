export declare interface Options {
  parseElement: ['imports', 'components']; // components by default
}

export declare interface ComponentStructure {
  file: string;
  components: string[];
  options?: { [key: string]: string };
}
