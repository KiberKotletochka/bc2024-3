const fs = require("node:fs");
const { program } = require('commander');

program
    .option('-i, --input <path>', 'input a .json file; the option is mandatory')
    .option('-o, --output <path>')
    .option('-d, --display');

program.parse();

const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

fs.readFile(options.input, 'utf8', (err, data) => {
    if (err) {
        console.error('Cannot read input file');
        process.exit(1);
    }
    let jsonData;
    jsonData = JSON.parse(data);
    const result = jsonData.map(entry => `${entry.exchangedate}:${entry.rate}`).join('\n');
    if (options.output) {fs.writeFile(options.output, result, (err) => {
        if (err) {
            console.error('Cannot write input file');
        }
    })}
    if (options.display) {
        console.log(result);
    }
})