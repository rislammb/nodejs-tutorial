/*
 * Title: Quotes Library
 * Description: Utility library for getting a list of Quotes
 * Author: Rayhanul Islam
 * Date: 20 Aug 2022
 */

// Dependencies
const fs = require('fs');

// Quotes object - module scaffolding
const quotes = {};

// Get all the quotes and return them to user
quotes.allQuotes = function allQuotes() {
    // Read the text file containing the quotes
    const fileContents = fs.readFileSync(`${__dirname}/quotes.txt`, 'utf8');

    // Turn the string into an array
    const arrayOfQuotes = fileContents.split(/\r?\n/);

    // Return the array
    return arrayOfQuotes;
};

// Export the library
module.exports = quotes;
