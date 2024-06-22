function monthName(mon) {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mon - 1];
}

export default function getFileName(sponsor, start_date) {
    const date = new Date(start_date);
    const month = monthName(date.getMonth())
    const year = date.getFullYear();
    return `${year}-${month}-${sponsor}-Invoice`
}