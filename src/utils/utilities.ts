export const shortDate = (date: any) => {
    return (new Date(date)).toLocaleString('en-BD', {year: 'numeric', month: 'short', day: 'numeric'})
}

export const shortTime = (time: any) => {
    return (new Date(time)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export const shortDateTime = (time: any) => {
    return (new Date(time)).toLocaleTimeString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
}

export const formatDateYMD = (date: Date): string => {
    return `${date.toISOString().slice(0, 10)}`;
}

export const currencyFormat = (amount: number) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 });
}

export const currencyFormatArray = (numbers: number[]): string => {
    if (!Array.isArray(numbers)) return 'N/A';

    const formatter = new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 });
    return numbers.map(num => formatter.format(num)).join(', ');
};

export const formatTimePeriod = (days: number): string => {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    const remainingDayInMonth = remainingDays % 30;

    if (years > 0 && months > 0 && remainingDayInMonth > 0) {
        return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}, ${remainingDayInMonth} day${remainingDayInMonth !== 1 ? 's' : ''}`;
    } else if (years > 0 && months > 0) {
        return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
    } else if (years > 0 && remainingDayInMonth > 0) {
        return `${years} year${years !== 1 ? 's' : ''}, ${remainingDayInMonth} day${remainingDayInMonth !== 1 ? 's' : ''}`;
    } else if (months > 0 && remainingDayInMonth > 0) {
        return `${months} month${months !== 1 ? 's' : ''}, ${remainingDayInMonth} day${remainingDayInMonth !== 1 ? 's' : ''}`;
    } else if (years > 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
    } else if (months > 0) {
        return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
        return `${remainingDayInMonth} day${remainingDayInMonth !== 1 ? 's' : ''}`;
    }
};

export const formatCamelCaseToTitleCase = (input: string): string => {
    if (!input || typeof input !== 'string') return '';
    const words = input.split(/(?=[A-Z])/); // Split by capital letters
    const titleCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return titleCaseWords.join(' ');
};

export const groupByDate = (array: any[], key: string) => {
    return array.reduce((result, item) => {
        const groupKey = shortDate(item[key]);
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
}