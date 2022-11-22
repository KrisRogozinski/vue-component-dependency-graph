export interface Options {
  parseElement: ['imports', 'components']; // components by default
}

const SCRIPT_REGEX = /<script(?<scriptAttr>[^>]*)?>(?<content>.*?)<\/script>/s;

const input = `<script lang='ts'>
export default {
  components: {
    ALink,
    AInput,
    List
  };
};
</script>`;

const result = input.match(SCRIPT_REGEX);

const COMPONENTS_REGEX = /components: {.*?};/s;
const components = result.groups.content.match(COMPONENTS_REGEX);

const COMPONENTS_LIST_REGEX = /([A-Z]{1,2}[a-zA-Z]{1,})/g;
const componentsList = components[0].match(COMPONENTS_LIST_REGEX);

console.log('components x.vue', result.groups.scriptAttr, componentsList);
