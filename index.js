const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const { readFile, writeFile } = require("fs");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    // TODO: Pull a random quote from the quotes.txt file
    const data = JSON.parse(await readFile('./QUOTE_FILE', function(err) {
      if (err) throw err}))
      // choose one of the lines...
      let line = data[Math.floor(Math.random()*data.length)]
      // console log the quote and author
      let selectedLine = data[line]
      const quoteAndAuthor = selectedLine.split('|')
      const quote = JSON.stringify(quoteAndAuthor[0])
      const author = JSON.stringify(quoteAndAuthor[1])
      // You may style the text with chalk as you wish
      console.log(chalk.bgCyan(quote))
      console.log(chalk.cyan(author))
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    const addQuote = await writeFile('./QUOTE_FILE', JSON.stringify(data, null, 3))
    // If no author is provided,
    // After the quote/author is saved,
    let authored = 4
    let addAuthor = await writeFile('./QUOTE_FILE', JSON.stringify(data, null, authored, function (err) {
      if (err) throw err
      authored = "Anonymous"
      addAuthor = writeFile('./QUOTE_FILE', JSON.stringify(data, null, authored, function (err) {
        if (err) throw err;
        console.log('SAVED')
      }))
    }))
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    console.log(chalk.yellow("Your quote is saved!"))
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving
    const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
    pipe(addQuote, addAuthor)
  });

program.parse();
