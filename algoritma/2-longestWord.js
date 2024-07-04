// 2. Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

function longestWord(sentence){
    const words = sentence.split(` `)
    let longestWord = ``;
    for(let word of words){
        if(word.length > longestWord.length){
            longestWord = word;
        }
    }
    return `${longestWord}: ${longestWord.length} characters`
}
const sentence = "Saya sangat senang mengerjakan soal algoritma"
console.log(longestWord(sentence))