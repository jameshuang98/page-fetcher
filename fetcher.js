// saving inputs from command line
const info = process.argv.slice(2)

// importing modules
const request = require('request');
const fs = require('fs')

// What does this do?
// process is the node program running
// process.stdin is the input from keyboard
// process.stdout outputs to the monitor
const readline = require('readline').createInterface({   input: process.stdin,   output: process.stdout });

// Sends HTTP request
request(info[0], (error, response, body) => {
    if (error && error.code === 'ENOTFOUND') {
        console.log('URL not found')
        process.exit(0)
    }
    
    // Checking if file name already taken
    if (fs.existsSync('./' + info[1])) {
        // Storing the user input
        // readline.question is an asynchronous operation (isn't waiting for my answer/ isn't blocking code from running)
        const answer = readline.question('Would you like to overwrite? Y/N ', decision => {
            if (decision.toLowerCase() === 'n') {
                process.exit(0)
            } else if (decision.toLowerCase() === 'y') {
                
                fs.writeFile(info[1], body, err => {
                    // if the URL is not the issue, then the file path is the issue
                    if (err) {
                        console.log('file path is invalid')
                        process.exit(0);
                    } else {
                        console.log('Downloaded and saved ' + body.length + 'bytes to ' + info[1]);
                    }
                })
                readline.close()
            }
        });
    } else {

        fs.writeFile(info[1], body, err => {
            // if the URL is not the issue, then the file path is the issue
            if (err) {
                console.log('file path is invalid')
                process.exit(0);
            } else {
                console.log('Downloaded and saved ' + body.length + 'bytes to ' + info[1]);
            }
        })
        readline.close()
    }

})

