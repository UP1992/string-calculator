function Add(numbers) {
  if (numbers === "") return 0;
  const numbs = convertStrToNum(numbers);
  const filteredNums = numbs.filter(n => n <= 1000);
  const negatives = numbs.filter(n => n < 0);
  if (negatives.length) throw new Error(`negatives not allowed: ${negatives.join(",")}`);
  return filteredNums.reduce((a, b) =>  a + b , 0);
}

function convertStrToNum(numbers) {
  let delimiters = /[\n,]/;
  if (numbers.startsWith("//")) {
    const match = numbers.match(/^\/\/(\[.*\])\n/);
    if (match) {
      const delimiterList = match[1].match(/\[([^\]]+)\]/g).map(d => d.slice(1, -1));
      const escaped = delimiterList.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      delimiters = new RegExp(escaped.join("|"));
      numbers = numbers.replace(/^\/\/.*\n/, '');
    } else {
      const matchSingle = numbers.match(/^\/\/(.)\n/);
      if (matchSingle) {
        delimiters = new RegExp(`[${matchSingle[1]}]`);
        numbers = numbers.split("\n")[1];
      }
    }
  }
  return numbers.split(delimiters).map(Number);
}
  


module.exports = { Add };