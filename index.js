const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const { writeFile } = require("fs");
const QUOTE_FILE = "./quotes.txt";
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    // TODO: Pull a random quote from the quotes.txt file
      const data = await fs.readFile(QUOTE_FILE, 'utf-8', function(err){
      if (err) throw err})
      // choose one of the lines...
      // const line = Math.floor(Math.random()*data.length)
      const fileBuffer =  data
      const to_string = fileBuffer.toString();
      const split_lines = to_string.split("\n");
      const randomLine = Math.floor(Math.random()*split_lines.length)-1
      const selectedLine = split_lines[randomLine]
      const quoteAndAuthor = selectedLine.split('|')
      const quote = JSON.stringify(quoteAndAuthor[0])
      const author = JSON.stringify(quoteAndAuthor[1])
      // // You may style the text with chalk as you wish
      const colorQuote = chalk.bgCyan(quote)
      const colorAuthor = chalk.cyan(author)
      console.log(colorQuote)
      console.log(colorAuthor)
      // // console log the quote and author
      // console.log(colorQuote)
      // console.log(colorAuthor)
      // pipe(console.log)(colorQuote, colorAuthor)
      // const fileContents = await fs.readFile(QUOTE_FILE, 'utf-8')
      // console.log(fileContents[0])
    });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // After the quote/author is saved,
    // alert the user that the quote was added.
    const colorTxt = chalk.yellow('Your quote was saved!')
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving
    const newLineQuote = '\n' + quote
    const addQuote = await fs.appendFile(QUOTE_FILE, newLineQuote, function(err){
      if (err) throw err
    })
    const separatorAuthor = ' |' + author
    const addAuthor = await fs.appendFile(QUOTE_FILE, separatorAuthor, function(err){
      if (err) author = 'Anonymous'
    })
    pipe(addQuote, addAuthor)
    console.log(colorTxt)
  });

program.parse();
