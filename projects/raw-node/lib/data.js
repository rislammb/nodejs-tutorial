// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// base directory of the data folder
lib.baseDir = path.join(__dirname, '../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    fs.open(`${lib.baseDir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (err || !fileDescriptor) {
            callback('There was an error, file may already exists!');
        } else {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (err2) {
                    callback('Error writing to new file!');
                } else {
                    fs.close(fileDescriptor, (err3) => {
                        if (err3) {
                            callback('Error closing the new file!');
                        } else {
                            callback(false);
                        }
                    });
                }
            });
        }
    });
};

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.baseDir + dir}/${file}.json`, 'utf8', (err, data) => callback(err, data));
};

// update existing file
lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.baseDir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (err || !fileDescriptor) {
            callback('Error updating. File may not exist!');
        } else {
            // truncate the file
            fs.ftruncate(fileDescriptor, (err2) => {
                if (err2) {
                    callback('Error truncating file!');
                } else {
                    // convert the data to string
                    const stringData = JSON.stringify(data);

                    // write to the file
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if (err3) {
                            callback('Error writing to file');
                        } else {
                            // close the file
                            fs.close(fileDescriptor, (err4) => {
                                if (err4) {
                                    callback('Error closing file!');
                                } else {
                                    callback(false);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

// delete existing file
lib.deleteD = (dir, file, callback) => {
    fs.unlink(`${lib.baseDir + dir}/${file}.json`, (err) => {
        if (err) {
            callback('Error deleting file');
        } else {
            callback(false);
        }
    });
};

// module exports
module.exports = lib;
