export class DateManager {
    constructor() {

    }
    getTodaysDate() {
        if (this.CONSOLE_LOG == true)
            console.log("Entered getTodaysDate");
        let date = new Date;
        return date.toLocaleDateString();
    }
    formatTitleDate(ogDate) {//Index only
        let dateText = ogDate.toDateString();
        let dayAbbreviation = dateText.slice(0, 3);
        let month = dateText.slice(4, 7);
        let dateNumber = dateText.slice(8, 10);
        let day;
        switch (dayAbbreviation) {
            case "Mon":
                day = "Monday";
                break;
            case "Tue":
                day = "Tuesday";
                break;
            case "Wed":
                day = "Wednesday";
                break;
            case "Thu":
                day = "Thursday";
                break;
            case "Fri":
                day = "Friday";
                break;
            case "Sat":
                day = "Saturday";
                break;
            case "Sun":
                day = "Sunday";
                break;
        }
        if (dateNumber[0] == 0) {
            dateNumber = dateNumber.replace("0", "");
        }
        let suffix = this.getSuffix(ogDate.getDate());
        return `${day} ${month} ${dateNumber}${suffix}`;
    }
    getSuffix(day) {//private
        if (day >= 11 && day <= 13) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

}