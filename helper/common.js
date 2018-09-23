export const checkNumericOnlyType = (value) => {
    return /^\d+$/.test(value);
}

export const getFormattedDate = (date) => {
    return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
}

export const convertStringToDate = (dateString) => {
    const dateParts = dateString.split("/");
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}