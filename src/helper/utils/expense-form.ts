export const validateForm = (title: string, amount: string, date: string) => {
    return title !== '' && date !== '' && amount !== '';
}

export const isValueEmpty = (value: string) => {
    return value === "";
}