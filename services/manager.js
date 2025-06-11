import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Papa from 'papaparse';

export class Manager {
    //#region Constants
    CONSOLE_LOG = false;
    FILE_STATUSES = {
        bothExist: 2,//both the file and the row for today exist
        oneExist: 1,//only the file exists
        noneExist: 0//the file does not exist
    }
    DATA_DICTIONARY = {
        down: 1,
        wake: 2,
        nap: 3,
        activity: 4,
        breakfast: 5,
        lunch: 6,
        dinner: 7,
        snack: 8,
        weight: 9,
        notes: 10
    }
    CSV_HEADER = `Daily Tracker,,,,,,,,,,
    Date,Down,Wake,Nap,Activity,Breakfast,Lunch,Dinner,Snack,Weight,Notes`;
    PATH = RNFS.DocumentDirectoryPath + '/daily_tracker_data.csv';
    //#endregion
    constructor() {

    }
    //#region Read
    async getEntireColumn(index) {
        try {
            const data = await RNFS.readFile(this.PATH, 'utf8');
            let parsed = Papa.parse(data, { delimiter: ",", skipEmptyLines: true });//convert data into 2d array
            //grab the index of each row
            let final = [];
            parsed.data.forEach(row => {
                final.push(row[index]);
            });
            return final;
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    // getCSV: Returns a string array. Each index is a row of the CSV in string format. Headers have been removed.
    async getCSV() {
        const contents = await RNFS.readFile(this.PATH, 'utf8');
        let rows = contents.split("\n");
        rows.splice(0, 2);
        return rows;
    }
    //#endregion
    //#region Write
    createEmptyDayData() {
        let dayData = {
            sleep_end: "",
            sleep_start: "",
            nap: null,
            activity: [],
            breakfast: "",
            lunch: "",
            dinner: "",
            snack: "",
            weight: null,
            notes: [],
        }
        return dayData;
    }

    async writeCSV(dayData) {
        console.log("Entered WriteCSV: " + JSON.stringify(dayData));
        let newRow = this.createEntireRow(dayData);
        console.log("newrow: " + newRow);

        let content = this.CSV_HEADER + '\n' + newRow;
        await RNFS.writeFile(this.PATH, content, 'utf8')
            .then((success) => {
                if (this.CONSOLE_LOG == true)
                    console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });;
    }

    //must be passed an object
    createEntireRow(day) {
        const escapeQuotes = (str = '') => String(str).replace(/"/g, '""');

        let csvDate = this.getTodaysDate();

        let row;
        try {
            row = [
                csvDate,
                day.sleep_start,
                day.sleep_end,
                day.nap == null ? "" : day.nap,
                `"${escapeQuotes(day.activity)}"`,
                `"${escapeQuotes(day.breakfast)}"`,
                `"${escapeQuotes(day.lunch)}"`,
                `"${escapeQuotes(day.dinner)}"`,
                `"${escapeQuotes(day.snack)}"`,
                day.weight == null ? "" : day.weight,
                `"${escapeQuotes(day.notes)}"`
            ].join(',');
            if (this.CONSOLE_LOG)
                console.log("createEntireRow returns: " + row);
            return row;
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }

    async appendFile(dayData) {
        let newRow = this.createEntireRow(dayData);
        newRow = "\n" + newRow;
        await RNFS.appendFile(this.PATH, newRow, 'utf8')
            .then((success) => {
                if (this.CONSOLE_LOG == true)
                    console.log('FILE Appended!');
            })
            .catch((err) => {
                console.log(err.message);
            });;
    }

    async getLastRow() {//Returns data OBJECT
        let data = await this.getCSV();//string array
        let rowItems = Papa.parse(data[data.length - 1], { delimiter: ",", skipEmptyLines: true });
        //rowItems.data[0][0] is the first row first column
        let lastRow = rowItems.data[0];
        let obj = {
            sleep_start: lastRow[this.DATA_DICTIONARY.down],
            sleep_end: lastRow[this.DATA_DICTIONARY.wake],
            nap: lastRow[this.DATA_DICTIONARY.nap],
            activity: [lastRow[this.DATA_DICTIONARY.activity]],
            breakfast: lastRow[this.DATA_DICTIONARY.breakfast],
            lunch: lastRow[this.DATA_DICTIONARY.lunch],
            dinner: lastRow[this.DATA_DICTIONARY.dinner],
            snack: lastRow[this.DATA_DICTIONARY.snack],
            weight: lastRow[this.DATA_DICTIONARY.weight],
            notes: lastRow[this.DATA_DICTIONARY.notes] ? [lastRow[this.DATA_DICTIONARY.notes]] : [],
        }
        if (this.CONSOLE_LOG)
            console.log("exiting getLastRow");
        return obj;
    }
    /**
     * Adds header to a string of several rows delimited by \n and writes to file.
     * @param {string} input
     */
    async writeFileSeveralRows(input) {
        //first put the header on the rows
        let content = this.CSV_HEADER + '\n' + input;
        try {
            await RNFS.writeFile(this.PATH, content, 'utf8');
            console.log("success writing file");
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }

    async exportCSV() {
        try {
            // Prepare share options
            const shareOptions = {
                title: 'Export File',
                url: `file://${this.PATH}`,
                type: 'text/csv',
                failOnCancel: false,
            };

            // Trigger share sheet (includes Files app)
            await Share.open(shareOptions);

            // Optional cleanup: delete file after share (or keep if needed)
            // await RNFS.unlink(path);
        } catch (error) {
            console.error('Error exporting file:', error);
            Alert.alert('Export Failed', 'There was a problem exporting the file.');
        }
    }
    //#endregion
    //#region Helpers
    /**
    * Returns true if the file exists
    */
    async checkForExistingFile() {
        let result = await RNFS.exists(this.PATH);
        if (this.CONSOLE_LOG == true)
            console.log("Existing file: " + result);
        return result;
    }
    /**
     * True if there is an existing row for today
     */
    async checkForExistingDay() {
        let data = await this.getCSV();
        let lastRow = data[data.length - 1];
        let rowItems = Papa.parse(lastRow, { delimiter: ",", skipEmptyLines: true });
        let columns = rowItems.data[0];
        if (columns[0] == this.getTodaysDate()) {
            if (this.CONSOLE_LOG == true)
                console.log("Existing day: True!");
            return true;
        } else {
            if (this.CONSOLE_LOG == true)
                console.log("Existing day: False!");
            return false;
        }
    }

    /**
     * Returns a this.FILE_STATUSES.
     */
    async getFileStatus() {
        let exists = await this.checkForExistingFile();
        if (exists) {
            let existingDay = await this.checkForExistingDay();
            if (existingDay) {
                return this.FILE_STATUSES.bothExist;

            } else {
                return this.FILE_STATUSES.oneExist;
            }
        } else {
            return this.FILE_STATUSES.noneExist;
        }
    }

    getTodaysDate() {
        if (this.CONSOLE_LOG == true)
            console.log("Entered getTodaysDate");
        let date = new Date;
        return date.toLocaleDateString();
    }
    //#endregion
}