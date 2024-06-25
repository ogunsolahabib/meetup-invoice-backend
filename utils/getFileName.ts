import getMonthName from "./getMonthName";


export default function getFileName(sponsor, start_date) {
    const date = new Date(start_date);
    const month = getMonthName(date.getMonth())
    const year = date.getFullYear();
    return `${year}-${month}-${sponsor}-Invoice`
}