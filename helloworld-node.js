#!/usr/bin / env node

/* Parameters
**      name = {$User.Name}
** Image
**  copado-function-core:v1 */

const execSync = require('child_process').execSync;

const name = process.env.name;

//Helper methods
const logInfo = msg => console.log(msg);

const logError = msg => {
    logInfo(msg);
    execSync("copado --error-message '" + msg + "'");
}

const logProgress = msg => {
    logInfo(msg);
    execSync("copado --progress '" + msg + "'");
}

//Main Script
const greeting = () => {
    logProgress("Starting the Greetings function");
    execSync(`echo \"Hello World\" ${name}`,
        { stdio: 'inherit', stderr: 'inherit' });
    logProgress("Cleaning up");
}

greeting();
