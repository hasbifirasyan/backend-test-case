// 4. Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
function diagonalDifference(matrix){
    let primaryDiagonal = 0
    let secondaryDiagonal = 0;
    for (let i = 0 ; i<matrix.length; i++){
        primaryDiagonal += matrix[i][i];
        secondaryDiagonal += matrix[i][matrix.length-1-i]
    }
    return Math.abs(primaryDiagonal-secondaryDiagonal)
}
console.log(diagonalDifference(matrix))