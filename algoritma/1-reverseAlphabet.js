// 1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"
function alphabetReverser(str) {
  const num = str[str.length - 1];
  let result = "";
  for (let i = str.length - 2; i >= 0; i--) {
    result += str[i];
  }
  return result + num;
}

console.log(alphabetReverser(`NEGIE1`));

