const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const { writeFile } = require("fs");
const QUOTE_FILE = "./quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
      const data = await fs.readFile(QUOTE_FILE, "utf-8");
      const split_lines = data.split("\n").filter((line) => line);
      const randomLine = Math.floor(Math.random() * split_lines.length);
      const selectedLine = split_lines[randomLine];
      const quoteAndAuthor = selectedLine.split("|");
      const quote = quoteAndAuthor[0];
      const author = quoteAndAuthor[1];
      const colorQuote = chalk.bgCyan(quote);
      const colorAuthor = chalk.cyan(author);
      console.log(colorQuote);
      console.log(colorAuthor);
    });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    const newLineQuote = "\n" + quote + "|" + (author ? author : "Anonymous");
    await fs.appendFile(QUOTE_FILE, newLineQuote);
    const colorTxt = chalk.yellow('Your quote was saved!');
    console.log(colorTxt);
  });

program.parse();
