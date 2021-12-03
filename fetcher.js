// saving inputs from command line
const info = process.argv.slice(2)

// importing modules
const request = require('request');
const fs = require('fs')

// What does this do?
const readline = require('readline').createInterface({   input: process.stdin,   output: process.stdout });
const input = process.stdin
const output = process.stdout

// Sends HTTP request
request(info[0], (error, response, body) => {
    if (error && error.code === 'ENOTFOUND') {
        console.log('URL not found')
        process.exit(0)
    }
    
    // Checking if file name already taken
    if (fs.existsSync('./' + info[1])) {
        // Storing the user input
        const answer = readline.question('Would you like to overwrite? Y/N ', decision => {
            //console.log(decision)
            if (decision.toLowerCase() === 'n') {
                process.exit(0)
            }
        });
    } else {
        readline.close()
    }

    fs.writeFile(info[1], body, err => {
            // if the URL is not the issue, then the file path is the issue
            if (err) {
            console.log('file path is invalid')
            process.exit(0);
        }
        console.log('Downloaded and saved ' + body.length + 'bytes to ' + info[1]);
    })
})

