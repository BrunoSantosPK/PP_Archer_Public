export default function normData(string, format = "curta") {
    const list = string.split(" ");
    const dias = list[0].split("-");
    const data = `${dias[2]}/${dias[1]}/${dias[0]}`;

    if(format == "curta") {
        return data;
    } else {
        return `${data} ${list[1]}`;
    }
}