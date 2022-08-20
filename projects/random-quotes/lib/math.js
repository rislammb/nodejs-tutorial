/*
 * Title: Math Library
 * Description: Utility library for math releted function
 * Author: Rayhanul Islam
 * Date: 20 Aug 2022
 */

// Math object - module scaffolding
const math = {};

// Get a random number between two integers
math.getRandomNumber = function getRandomNumber(min, max) {
    const minimum = typeof min === 'number' ? min : 0;
    const maximum = typeof max === 'number' ? max : 0;
    return Math.floor(Math.random() * (maximum - minimum + 1) + min);
};

// Export the library
module.exports = math;
