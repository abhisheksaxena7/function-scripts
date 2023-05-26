#!/usr/bin/env node

/* Image
**  copado-function-core:v1
*/

const execSync = require('child_process').execSync;
const commands = `
    copado -p 'Initializing npm'
    cd /tmp
    npm init -y
    copado -p 'installing sfdx-node'
    npm i --save sfdx-node
    copado -p 'generating'
`;
execSync(commands);
const sfdx = require('sfdx-node');
//authorize a dev hub
sfdx.force.org.list({
  _quiet: false,
});
