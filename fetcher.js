const info = process.argv.slice(2)
const request = require('request');
const fs = require('fs')

const readline = require('readline').createInterface({   input: process.stdin,   output: process.stdout });
const input = process.stdin
const output = process.stdout

request(info[0], (error, response, body) => {
    if (error && error.code === 'ENOTFOUND') {
        console.log('URL not found')
        process.exit(0)
    }
    if (fs.existsSync('./' + info[1])) {
        const answer = readline.question('Would you like to overwrite? Y/N ' , decision => {
            //console.log(decision)
            if (decision.toLowerCase() === 'n') {
                process.exit(0)
            }
            readline.close();
        });
    } else {
        readline.close()
    }

    fs.writeFile(info[1], body, err => {
            if (err) {
            console.log('file path is invalid')
            return
        }
    })
})

