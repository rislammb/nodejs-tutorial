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
};

environments.production = {
    port: 5000,
    envName: 'production',
};

// determine which environment was passed
const currentEnv =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.trim() : 'staging';

// select corresponding environment object
const selectedEnv =
    typeof environments[currentEnv] === 'object' ? environments[currentEnv] : environments.staging;

// export module
module.exports = selectedEnv;
