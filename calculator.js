function Add(numbers) {
  if (numbers === "") return 0;
``
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

  const numbs = numbers.split(delimiters).map(Number);
  const negatives = numbs.filter(n => n < 0);
  if (negatives.length) throw new Error(`negatives not allowed: ${negatives.join(",")}`);
  return numbs.reduce((a, b) => b <= 1000 ? a + b : a, 0);
}



module.exports = { Add };
  