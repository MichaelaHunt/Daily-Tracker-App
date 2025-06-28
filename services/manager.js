import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Papa from 'papaparse';
import { DateManager } from './dateManager';
import dayjs from 'dayjs';


export class Manager {
    //#region Constants
    CONSOLE_LOG = true;
    FILE_STATUSES = {
        fileAndRowExist: 2,//both the file and the row exists
        fileExists: 1,//only the file exists
        fileMissing: 0//the file does not exist
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
    DATE_MANAGER;
    //#endregion
    constructor() {
        this.DATE_MANAGER = new DateManager();
    }
    //#region Read
    async getLastRow() {//Returns data OBJECT
        // let data = await this.getCSV();//string array
        // let rowItems = Papa.parse(data[data.length - 1], { delimiter: ",", skipEmptyLines: true });
        // //rowItems.data[0][0] is the first row first column
        // let lastRow = rowItems.data[0];
        // let obj = {
        //     sleep_start: lastRow[this.DATA_DICTIONARY.down],
        //     sleep_end: lastRow[this.DATA_DICTIONARY.wake],
        //     nap: lastRow[this.DATA_DICTIONARY.nap],
        //     activity: [lastRow[this.DATA_DICTIONARY.activity]],
        //     breakfast: lastRow[this.DATA_DICTIONARY.breakfast],
        //     lunch: lastRow[this.DATA_DICTIONARY.lunch],
        //     dinner: lastRow[this.DATA_DICTIONARY.dinner],
        //     snack: lastRow[this.DATA_DICTIONARY.snack],
        //     weight: lastRow[this.DATA_DICTIONARY.weight],
        //     notes: lastRow[this.DATA_DICTIONARY.notes] ? [lastRow[this.DATA_DICTIONARY.notes]] : [],
        // }
        // if (this.CONSOLE_LOG)
        //     console.log("exiting getLastRow");
        // return obj;
    }

    
    async getDatesRow(inputDate) {
        let date = dayjs(inputDate).format('M/D/YYYY');
        console.log("getDatesRow date was formatted as: " + date);
        //get all rows
        try {
            let data = await RNFS.readFile(this.PATH, 'utf8');
            data = data.replace(this.CSV_HEADER, '');
            let rows = Papa.parse(data, { delimiter: ",", skipEmptyLines: true });
            //return the row with index [0] that matches our date
            const match = rows.data.find(row => row[0] === date);
            if (this.CONSOLE_LOG)
                console.log("Match's contents: " + match);
            let matchObj = {
                sleep_end: match[this.DATA_DICTIONARY.down] || "",
                sleep_start: match[this.DATA_DICTIONARY.wake] || "",
                nap: match[this.DATA_DICTIONARY.nap] || null,
                activity: match[this.DATA_DICTIONARY.activity] || [],
                breakfast: match[this.DATA_DICTIONARY.breakfast] || "",
                lunch: match[this.DATA_DICTIONARY.lunch] || "",
                dinner: match[this.DATA_DICTIONARY.dinner] || "",
                snack: match[this.DATA_DICTIONARY.snack] || "",
                weight: match[this.DATA_DICTIONARY.weight] || null,
                notes: match[this.DATA_DICTIONARY.notes] || [],
            }
            return matchObj;
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    async getEntireColumn(index) {
        try {
            const data = await RNFS.readFile(this.PATH, 'utf8');
            let parsed = Papa.parse(data, { delimiter: ",", skipEmptyLines: true });//convert data into 2d array
            //grab the index of each row
            let final = [];
            parsed.data.forEach(row => {
                final.push(row[index]);
            });
            final.shift();
            final.shift();
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

    /**
     * This is for writing a file and row that did not exist.
     */
    async writeCSV(dayData, inputDate) {
        // console.log("Entered WriteCSV: " + JSON.stringify(dayData));
        let date = dayjs(inputDate).format("M/D/YYYY");
        dayData.date = date;
        let newRow = this.createEntireRowFromObject(dayData, date);

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
    createEntireRowFromObject(day, date) {
        const escapeQuotes = (str = '') => String(str).replace(/"/g, '""');
        let row;
        try {
            row = [
                date,
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

    createEntireRowFromArray(day) {
        const escapeQuotes = (str = '') => String(str).replace(/"/g, '""');
        let row;
        try {
            row = [
                day.date,
                day[this.DATA_DICTIONARY.down],
                day[this.DATA_DICTIONARY.wake],
                day[this.DATA_DICTIONARY.nap] == null ? "" : day[this.DATA_DICTIONARY.nap],
                `"${escapeQuotes(day[this.DATA_DICTIONARY.activity])}"`,
                `"${escapeQuotes(day[this.DATA_DICTIONARY.breakfast])}"`,
                `"${escapeQuotes(day[this.DATA_DICTIONARY.lunch])}"`,
                `"${escapeQuotes(day[this.DATA_DICTIONARY.dinner])}"`,
                `"${escapeQuotes(day[this.DATA_DICTIONARY.snack])}"`,
                day[this.DATA_DICTIONARY.weight] == null ? "" : day[this.DATA_DICTIONARY.weight],
                `"${escapeQuotes(day[this.DATA_DICTIONARY.notes])}"`
            ].join(',');
            if (this.CONSOLE_LOG)
                console.log("createEntireRow returns: " + row);
            return row;
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }

    async overwriteFileRow(dayData, inputDate) {//Notes - something's going wrong.
        try {
            let date = dayjs(inputDate).format('M/D/YYYY');
            let data = await RNFS.readFile(this.PATH, 'utf8');
            data = data.replace(this.CSV_HEADER, '');
            let rows = Papa.parse(data, { delimiter: ",", skipEmptyLines: true });
            //get the row index that already exists
            const matchingIndex = rows.data.findIndex(row => row[0] === date);
            // rows.data. remove the index then pop in another one
            rows.data.splice(matchingIndex, 1);
            //then push the new data to the array
            rows.data.push(
                [
                    date,
                    dayData.sleep_start,
                    dayData.sleep_end,
                    dayData.nap,
                    dayData.activity,
                    dayData.breakfast,
                    dayData.lunch,
                    dayData.dinner,
                    dayData.snack,
                    dayData.weight,
                    dayData.notes
                ]);
            console.log("Rows.data: " + rows.data[rows.data.length - 1]);
            let sortedArray = rows.data.sort((a, b) => {
                const parseDate = (str) => {
                    const [month, day, year] = str.trim().split('/').map(Number);
                    return new Date(year, month - 1, day);
                };
                return parseDate(a[0]) - parseDate(b[0]);
            });

            let inputString = '';

            sortedArray.forEach(row => {
                inputString += (`${row[0]},${row[1]},${row[2]},${row[3]},"${row[4]}","${row[5]}","${row[6]}","${row[7]}","${row[8]}",${row[9]},"${row[10]}"\n`);
            });
            await this.writeFileSeveralRows(inputString);
        } catch (error) {
            console.log("OVERWRITE_FILE ERROR: " + error);
        }

    }

    async appendFile(dayData, inputDate) {
        let date = dayjs(inputDate).format('M/D/YYYY');
        if (date == dayjs(new Date()).format('M/D/YYYY')) {//If the date is today
            let newRow = this.createEntireRowFromObject(dayData, date);
            newRow = "\n" + newRow;
            if (this.CONSOLE_LOG == true)
                console.log("Date is Today");
            await RNFS.appendFile(this.PATH, newRow, 'utf8')
                .then((success) => {
                    if (this.CONSOLE_LOG == true)
                        console.log('FILE Appended!');
                })
                .catch((err) => {
                    console.log(err.message);
                });;
        }
        else {//if the date is NOT today
            try {
                if (this.CONSOLE_LOG == true)
                    console.log("Date is not today");
                let data = await this.getCSV();//string array
                let rowItems = Papa.parse(data.join('\n'), { delimiter: ",", skipEmptyLines: true, quoteChar: "'" });
                //add the new row
                rowItems.data.push(
                    [
                        date,
                        dayData.sleep_start,
                        dayData.sleep_end,
                        dayData.nap,
                        `"${dayData.activity}"`,
                        dayData.breakfast,
                        dayData.lunch,
                        dayData.dinner,
                        dayData.snack,
                        dayData.weight,
                        `"${dayData.notes}"`,
                    ]);
                let sortedArray = rowItems.data.sort((a, b) => {
                    const parseDate = (str) => {
                        const [month, day, year] = str.trim().split('/').map(Number);
                        return new Date(year, month - 1, day);
                    };
                    return parseDate(a[0]) - parseDate(b[0]);
                });

                let inputString = '';

                sortedArray.forEach(row => {
                    inputString += (`${row}\n`);
                });
                await this.writeFileSeveralRows(inputString);
            } catch (error) {
                console.log('ERROR: ' + error);
            }

        }
    }


    /**
     * Adds header to a string of several rows delimited by \n and writes to file.
     * @param {string} input
     */
    async writeFileSeveralRows(input, inputDate) {//TODO:
        let date = dayjs(inputDate).format('M/D/YYYY');
        if (date == dayjs(new Date()).format('M/D/YYYY')) {//If the date is today
            let content = this.CSV_HEADER + '\n' + input;
            try {
                await RNFS.writeFile(this.PATH, content, 'utf8');
                console.log("success writing file");
            } catch (err) {
                console.log("ERROR: " + err);
            }
        } else {
            try {
                if (this.CONSOLE_LOG == true)
                    console.log("Date is not today");
                let data = await this.getCSV();//string array
                let rowItems = Papa.parse(data.join('\n'), { delimiter: ",", skipEmptyLines: true });
                //add the new row
                console.log("RowItems: " + rowItems.data);
                rowItems.data.push(
                    [
                        date,
                        dayData.sleep_start,
                        dayData.sleep_end,
                        dayData.nap,
                        `"${dayData.activity}"`,
                        dayData.breakfast,
                        dayData.lunch,
                        dayData.dinner,
                        dayData.snack,
                        dayData.weight,
                        `"${dayData.notes}"`,
                    ]);
                let sortedArray = rowItems.data.sort((a, b) => {
                    const parseDate = (str) => {
                        const [month, day, year] = str.trim().split('/').map(Number);
                        return new Date(year, month - 1, day);
                    };
                    return parseDate(a[0]) - parseDate(b[0]);
                });

                let inputString = '';

                sortedArray.forEach(row => {
                    inputString += (`${row}\n`);
                });
                await this.writeFileSeveralRows(inputString);
            } catch (error) {
                console.log('ERROR: ' + error);
            }

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
    async getDateIndex(targetDate) {
        let dateColumn = await this.getEntireColumn(0);
        let dateIndex;
        const formattedTarget = dayjs(targetDate).format('M/D/YYYY');
        dateColumn.forEach((item, index) => {
            if (item == formattedTarget) {
                dateIndex = index;
            }
        });
        return dateIndex;
    }

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
    async checkForExistingDay(targetDate) {
        if (this.CONSOLE_LOG == true)
            console.log("Entered CheckForExistingDay. Date: " + targetDate);
        let dateColumn = await this.getEntireColumn(0);
        if (this.CONSOLE_LOG == true)
            console.log("DateColumn: " + dateColumn);

        const formattedTarget = dayjs(targetDate).format('M/D/YYYY');
        const result = dateColumn.some(date => date === formattedTarget);
        if (this.CONSOLE_LOG == true)
            console.log("Exiting CheckForExistingDay. Result: " + result);
        return result;
    }
    /**
     * Returns a this.FILE_STATUSES.
     */
    async getFileStatus(date) {
        let exists = await this.checkForExistingFile();
        if (exists) {
            let existingDay = await this.checkForExistingDay(date);
            if (existingDay) {
                return this.FILE_STATUSES.fileAndRowExist;

            } else {
                return this.FILE_STATUSES.fileExists;
            }
        } else {
            return this.FILE_STATUSES.fileMissing;
        }
    }

    //#endregion
}