/*
 * Title: Node.js Random Quotes
 * Description: Simple Node application that print random quotes per second intervel
 * Author: Rayhanul Islam
 * Date: 20 Aug 2022
 */

// Dependencies
const mathLibrary = require('./lib/math');
const quotesLibrary = require('./lib/quotes');

// App object - Module scaffolding
const app = {};

// Configuration
app.config = {
    timeBetweenQuotes: 1000,
};

// Function that print a random quotes
app.printAQuote = function printAQuote() {
    // Get all the quotes
    const allQuotes = quotesLibrary.allQuotes();

    // Get the length of the qoutes
    const numberOfQuotes = allQuotes.length;

    // Pick a random number between 1 and the number of quotes
    const randomNumber = mathLibrary.getRandomNumber(1, numberOfQuotes);

    // Get the quote at that position in the array (minus one);
    const selectedQuote = allQuotes[randomNumber - 1];

    // Print the quote to the console
    console.log(selectedQuote);
};

// Function that loop indefinitely, calling the printQuote function as i goes
app.indefiniteLoop = function indefiniteLoop() {
    // Create the interval, using the config variable defined above
    setInterval(app.printAQuote, app.config.timeBetweenQuotes);
};

// Invoke the lopp
app.indefiniteLoop();
