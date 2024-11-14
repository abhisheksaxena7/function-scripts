#!/usr/bin/env node

/* Parameters
**      destinationSessionId = {$Destination.Credential.SessionId}
**      destinationEndpoint = {$Destination.Credential.Endpoint}
** Image
**  ubxxrh6cjl2pkhy5iaingoykadytnn-sfdx-scanner:v2     //using this because Copado's image copado-multicloud-dx:v5 had API version 61.0, and this function needs 62.0
** Context
**  Pass the ID of the DevHub Environment record in the Context
*/


const execSync = require("child_process").execSync;

const url = process.env['destinationEndpoint'];
const baseurl = url.substring(0, url.indexOf("/", url.indexOf("/") + 2));
const session = process.env['destinationSessionId'];
const endPoint = `/services/data/v62.0/actions/custom/flow/sfdatakit__DeployDataKitComponents`;

const setup = `
	copado -p 'Setting instance url'
    sf config set org-instance-url=${baseurl} --global

	git clone https://github.com/trailheadapps/coral-cloud.git
`;
execSync(setup);
const runDataKitFlow = `
    cd coral-cloud
    sf api request rest "${endPoint}" --method POST --body @config/data-kit-deploy.json --target-org ${session} 
`;
console.log('first line');
console.log(`Abhi log ${execSync(runDataKitFlow)}`);
console.log('Last line');
