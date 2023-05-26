#!/usr/bin/env node

/* Parameters
**      SESSION = {$Context.Credential.SessionId}
**      BASEURL = {$Context.Credential.Endpoint}
** Image
**  copado-multicloud-dx:v3
** Context
**  Pass the ID of the DevHub Environment record in the Context
*/

const execSync = require("child_process").execSync;

const url = process.env['BASEURL'];
const baseurl = url.substring(0, url.indexOf("/", url.indexOf("/") + 2));
const session = process.env['SESSION'];

const setup = `
	copado -p 'Setting instance url'
    sfdx force:config:set instanceUrl=${baseurl} --global

    copado -p 'Creating Temp Project'
    sfdx force:project:create -n temp

    copado -p 'Getting Package Info'
`;
execSync(setup);
const runVersionCMD = `
	cd temp
	sfdx force:package:beta:version:create:list -v ${session}
    `;
console.log('first line');
console.log(`Abhi log ${execSync(runVersionCMD)}`);
console.log('Last line');
