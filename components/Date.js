import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
    const date = parseISO(dateString);
    if(Number.isNaN(date.getTime())) {
        return <>error</>;
    }
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}