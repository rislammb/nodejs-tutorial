/*
 * Title: Workers library
 * Description: Server related functions
 * Author: Rayhanul Islam
 * Date: 05 Sep 2022
 */

// dpendencies

// workers object - module scaffolding
const workers = {};

// start the workers
workers.init = () => {
    console.log('Workers started');
};

// export module
module.exports = workers;
