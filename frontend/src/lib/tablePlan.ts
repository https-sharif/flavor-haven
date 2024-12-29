
const windowTable = [1, 4, 8, 12, 16, 20, 24];
const boothTable = [2, 6, 10, 14, 18, 22, 26];
const centerTable = [3, 7, 11, 15, 19, 23, 27];
const cornerTable = [5, 9, 13, 17, 21, 25];
const roofTopTable = [28, 29, 30, 31, 32, 33, 34];


const findTable = (randomTable: number): string | null => {
    if (windowTable.includes(randomTable)) return "Window Table";
    if (boothTable.includes(randomTable)) return "Booth Table";
    if (centerTable.includes(randomTable)) return "Center Table";
    if (cornerTable.includes(randomTable)) return "Corner Table";
    if (roofTopTable.includes(randomTable)) return "Roof Top Table";
    return null;
}
export default findTable;