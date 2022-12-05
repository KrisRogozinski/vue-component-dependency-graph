#! /usr/bin/env node
const arg = require('arg');

const args = arg({
  '--start': Boolean,
  '--build': Boolean,
  '--src': String,
});

function usage() {
  console.log(`tool [CMD]
    --start\tStarts the app
    --build\tBuilds the app`);
}

usage();
console.log(args);
