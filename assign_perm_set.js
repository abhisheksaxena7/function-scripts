#!/usr/bin/env node

/* Parameters
**      destinationSessionId = {$Destination.Credential.SessionId}
**      destinationEndpoint = {$Context.Credential.Endpoint}
**      destinationUsername = ${Destination.Credential.copado__Username__r} //unable to get this to work rn, and thus used Anon. Apex for assigning perm set
** Image
**  copado-multicloud-dx:v5
** Context
**  Pass the ID of the DevHub Environment record in the Context
*/

const execSync = require("child_process").execSync;

const url = process.env['destinationEndpoint'];
const baseurl = url.substring(0, url.indexOf("/", url.indexOf("/") + 2));
const session = process.env['destinationSessionId'];
/*const username = process.env['destinationUsername'];

console.log(process.env);
console.log(username);*/

const setup = `
	copado -p 'Setting instance url'
    sf config set org-instance-url=${baseurl} --global

    copado -p 'Creating Temp Project'
    sf project generate --name temp

    copado -p 'Assigning Permission set to the user'
`;
execSync(setup);
const assignPS = `
	cd temp
    sf org assign permset -n Coral_Cloud -b epic.92cd1730805183816@orgfarm.th --target-org ${session}
`;
/*const assignPS = `
	cd temp
    sf org assign permset -n Coral_Cloud --target-org ${session}
`;*/
console.log('first line');
console.log(`Abhi log ${execSync(assignPS)}`);
console.log('Last line');
