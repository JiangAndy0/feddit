

//takes a utc_created property and returns a human friendly string version
export const utcToString = utcCreated => {
    const utcCurrent = Date.now()/1000;
    const secondsSince = utcCurrent - utcCreated;

    const secondsMin = 60;
    const secondsHr = secondsMin * 60;
    const secondsDay = secondsHr * 24;
    const secondsMonth = secondsDay * 30.437;
    const secondsYear = secondsDay * 365;


    if ( secondsSince < secondsMin) { //less than 1 minute
        return `${secondsSince} sec.`;
    } else if (secondsSince < secondsHr) { //less than 1 hour
        const minutes = Math.floor( secondsSince / secondsMin );
        return `${minutes} min.`;
    } else if (secondsSince < secondsDay ) { //less than 1 day
        const hours = Math.floor( secondsSince / secondsHr);
        return `${hours} hr.`;
    } else if (secondsSince < secondsMonth) { //less than 1 month
        const days = Math.floor( secondsSince / secondsDay);
        if (days === 1) return `1 day`;
        return `${days} days`;
    }   else if (secondsSince < secondsYear) { //less than 1 year
        const months = Math.floor( secondsSince / secondsMonth);
        return `${months} mo.`;
    } else { //1 year or more
        const years = Math.floor( secondsSince / secondsYear);
        return `${years} yr.`;
    }
}

