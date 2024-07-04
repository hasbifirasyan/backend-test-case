// 3. Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];

function countWords(input, query) {
  let output = [];
  for (let q of query) {
    let count = 0;
    for (let i of input) {
      if (q === i) {
        count++;
      }
    }
    output.push(count);
  }
  return `OUTPUT = [${output}]`;
}
console.log(countWords(input, query));
