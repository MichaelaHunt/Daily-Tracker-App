import {Manager} from "./manager";
import Papa from 'papaparse';
import dayjs from "dayjs";
import RNFS from 'react-native-fs';

export class SleepManager extends Manager {
    constructor() {
        super();
    }
    //#region CRUD
    async setSleep(sleepStart, sleepWake, date) {
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://overwrite
                try {
                    data = await this.getDatesRow(date);
                    data.sleep_start = sleepStart;
                    data.sleep_end = sleepWake;

                    let fullContents = await this.getCSV();

                    if (fullContents.length > 1) {
                        await this.overwriteFileRow(data, date);
                    } else {//Overwrite the whole file since it was only today's row anyways
                        await this.writeCSV(data, date);
                    }
                } catch (error) {
                    console.log("error: " + error);
                }
                break;
            case this.FILE_STATUSES.fileExists://append
                data = this.createEmptyDayData();
                data.sleep_start = sleepStart;
                data.sleep_end = sleepWake;
                await this.appendFile(data, date);
                break;
            case this.FILE_STATUSES.fileMissing://create
                data = this.createEmptyDayData();
                data.sleep_start = sleepStart;
                data.sleep_end = sleepWake;
                await this.writeCSV(data, date);
                break;
        }
    }
    async setNap(nap, date) {
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://overwrite
                try {
                    data = await this.getDatesRow(date);
                    nap ? data.nap = 'Yes' : data.nap = "No";
                    console.log("nap: " + nap);
                    let fullContents = await this.getCSV();

                    if (fullContents.length > 1) {
                        await this.overwriteFileRow(data, date);
                    } else {//Overwrite the whole file since it was only today's row anyways
                        await this.writeCSV(data, date);
                    }
                } catch (error) {
                    console.log("error: " + error);
                }
                break;
            case this.FILE_STATUSES.fileExists://append
                data = this.createEmptyDayData();
                nap ? data.nap = 'Yes' : data.nap = "No";
                await this.appendFile(data, date);
                break;
            case this.FILE_STATUSES.fileMissing://create
                data = this.createEmptyDayData();
                nap ? data.nap = 'Yes' : data.nap = "No";
                await this.writeCSV(data, date);
                break;
        }



        // let fileStatus = await this.getFileStatus(date);
        // let data;
        // switch (fileStatus) {
        //     case this.FILE_STATUSES.fileAndRowExist:
        //         data = await this.getLastRow();
        //         console.log("start: " + data.sleep_start);
        //         console.log("wake: " + data.sleep_end);
        //         nap ? data.nap = 'Yes' : data.nap = "No";
        //         let newTodayRow = this.createEntireRow(data);

        //         let fullContents = await this.getCSV();

        //         if (fullContents.length > 1) {
        //             fullContents.pop();
        //             let inputString = '';
        //             fullContents.forEach(row => {
        //                 inputString += (`${row}\n`);
        //             });
        //             inputString += newTodayRow;
        //             await this.writeFileSeveralRows(inputString);
        //         } else {//Overwrite the whole file since it was only today's row anyways
        //             await this.writeCSV(data);
        //         }
        //         break;
        //     case this.FILE_STATUSES.fileExists:
        //         data = this.createEmptyDayData();
        //         nap ? data.nap = 'Yes' : data.nap = "No";
        //         await this.appendFile(data);
        //         break;
        //     case this.FILE_STATUSES.fileMissing:
        //         data = this.createEmptyDayData();
        //         nap ? data.nap = 'Yes' : data.nap = "No";
        //         await this.writeCSV(data);
        //         break;
        // }
    }
    /**
     * retrieves both sleep and nap data
     */
    async getSleepAndNap(inputDate) {
        let date = dayjs(inputDate).format('M/D/YYYY');
        let fileStatus = await this.getFileStatus(inputDate);
        let data;
        let nap = '?';
        let difference = 'TBD';
        let hours = '?';
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist:
                //get the file, check for matching row, and grab it.
                data = await RNFS.readFile(this.PATH, 'utf8');
                data = data.replace(this.CSV_HEADER, '');
                let rows = Papa.parse(data, { delimiter: ",", skipEmptyLines: true });
                //get the row index that already exists
                const match = rows.data.find(row => row[0] === date);
                if (match[this.DATA_DICTIONARY.down] != "" && match[this.DATA_DICTIONARY.wake] != "") {
                    hours = this.calculateHours(match[this.DATA_DICTIONARY.down], match[this.DATA_DICTIONARY.wake]);
                    difference = this.calculateDifference();
                }
                if (match[this.DATA_DICTIONARY.nap] != "" && match[this.DATA_DICTIONARY.nap] != null) {
                    nap = match[this.DATA_DICTIONARY.nap];
                }

                let result = {
                    hours: hours,
                    difference: difference,
                    nap: nap,
                }
                return result;
            case this.FILE_STATUSES.fileExists:
            case this.FILE_STATUSES.fileMissing:
            default:
                result = {
                    hours: hours,
                    difference: difference,
                    nap: nap
                }
                return result;
                break;
        }
    }
    //#endregion 
    //#region HELPERS
    /**
     * Takes in formatted times, outputs hours slept.
     * @param {*} sleepStart 
     * @param {*} sleepEnd 
     */
    calculateHours(sleepStart, sleepEnd) {
        let [sH, sM] = sleepStart.split(":");
        let [eH, eM] = sleepEnd.split(":");
        sH = Number(sH);
        sM = Number(sM);
        eH = Number(eH);
        eM = Number(eM);
        let hours = "0";
        let minutes = "0";
        if (sH < 12) {
            hours = String(eH - sH);
        } else {
            hours = String((24 - sH) + eH);
        }
        sM > eM ? minutes = sM - eM : minutes = eM - sM;
        minutes = String(minutes).padStart(2, '0');
        let formattedHours = `${hours}:${minutes}`;
        return formattedHours;
    }
    
    async calculateDifference() {//TODO:
        let difference = 'TBD';
        let data = await this.getCSV();
        let csvString = data.join("\n");
        let rowItems = Papa.parse(csvString, { delimiter: ",", skipEmptyLines: true });
        if (rowItems.data[rowItems.data.length - 2][this.DATA_DICTIONARY.down] != "" && rowItems.data[rowItems.data.length - 2][this.DATA_DICTIONARY.wake] != "") {
            if (rowItems.data.length > 1 && this.subsequentDates(rowItems.data[rowItems.data.length - 2][0], rowItems.data[rowItems.data.length - 1][0])) {
                let [firstRowStartH, firstRowStartM] = rowItems.data[rowItems.data.length - 2][this.DATA_DICTIONARY.down].split(":");
                let [firstRowEndH, firstRowEndM] = rowItems.data[rowItems.data.length - 2][this.DATA_DICTIONARY.wake].split(":");
                let [lastRowStartH, lastRowStartM] = rowItems.data[rowItems.data.length - 1][this.DATA_DICTIONARY.down].split(":");
                let [lastRowEndH, lastRowEndM] = rowItems.data[rowItems.data.length - 1][this.DATA_DICTIONARY.wake].split(":");
        
                let firstRowStart = Number(firstRowStartH) * 60 + Number(firstRowStartM);
                let firstRowEnd = Number(firstRowEndH) * 60 + Number(firstRowEndM);
                let lastRowStart = Number(lastRowStartH) * 60 + Number(lastRowStartM);
                let lastRowEnd = Number(lastRowEndH) * 60 + Number(lastRowEndM);
                let startDifference = Math.abs(firstRowStart - lastRowStart);
                let endDifference = Math.abs(firstRowEnd - lastRowEnd);
                difference = startDifference + endDifference;
            }
        }
        return difference === 'TBD' ? 'TBD' : `${difference}min`;
    }
    
    subsequentDates(dateStr1, dateStr2) {//This function courtesy of ChatGPT
        // Parse both date strings
      const [month1, day1, year1] = dateStr1.split('/').map(Number);
      const [month2, day2, year2] = dateStr2.split('/').map(Number);
    
      // Create Date objects (normalize to midnight)
      const date1 = new Date(year1, month1 - 1, day1);
      const date2 = new Date(year2, month2 - 1, day2);
    
      // Get the difference in milliseconds and convert to days
      const diffInTime = Math.abs(date1 - date2);
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
    
      // Return true if dates are exactly one day apart
      return diffInDays === 1;
    }
    //#endregion
}