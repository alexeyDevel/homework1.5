const http = require('http');
const axios = require('axios');
const url = require("url")
const constant = require('./config');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

rl.question('Input your city:\n', answer => {
    const url = `${constant.URL}?access_key=${constant.ACCESS_TOKEN}&query=${answer}`;
    http.get(url, (response) =>{
        response.setEncoding('utf8');
        if (response.statusCode !== 200){
            console.log(`statusCode: ${statusCode}`)
            return
        }
        response.setEncoding('utf8');
        let data = '';
        response
            .on('data', chunk => {
                data += chunk;
            })
            .on("end", () => {
                const weather = JSON.parse(data);
                console.log(`Current temperature in ${weather.location.name} is ${weather.current.temperature}℃`);
            })
    }).on("error", (err) => {
        console.log(err);
    })

    rl.close();
})


