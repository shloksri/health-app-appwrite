const dateValue = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
const timeValue = {
    hour: '2-digit',
    minute: '2-digit'
};


function formatDate(option, isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString('en-US', option);
}

export { dateValue, timeValue, formatDate };