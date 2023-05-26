#!/usr/bin/env node

/* Image
**  copado-function-core:v1
*/

const execSync = require('child_process').execSync;
const commands = `
    copado -p 'Initializing npm'
    cd /tmp
    npm init -y
    copado -p 'installing Toposort'
    npm i --save toposort
    copado -p 'generating'
`;
execSync(commands);
const toposort = require('toposort');

var sfdx = [
  ['bl', 'schema'],
  ['ui', 'schema'],
  ['ui', 'bl'],
  ['perms', 'schema'],
  ['perms', 'bl'],
  ['perms', 'ui']
];

//Right Order using Toposort schema,bl,ui,perms
console.log('Right Order using Toposort ' + toposort(sfdx).reverse());
