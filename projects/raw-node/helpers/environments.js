/*
 * Title: Environments
 * Description: Handle all environments related things
 * Author: Rayhanul Islam
 * Date: 22 Aug 2022
 */

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'uhhsdsdisiufhfyfh',
    maxChecks: 5,
    twilioEnv: {
        fromPhone: '+',
        accountSid: '',
        authToken: '',
    },
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'iuhswyewdhdhcsbfhf',
    maxChecks: 5,
    twilioEnv: {
        fromPhone: '+',
        accountSid: '',
        authToken: '',
    },
};

// determine which environment was passed
const currentEnv =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.trim() : 'staging';

// select corresponding environment object
const selectedEnv =
    typeof environments[currentEnv] === 'object' ? environments[currentEnv] : environments.staging;

// export module
module.exports = selectedEnv;
