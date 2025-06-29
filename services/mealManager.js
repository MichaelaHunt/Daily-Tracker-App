import { Manager } from "./manager";
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import dayjs from "dayjs";

export class MealManager extends Manager {
    CONSOLE_LOG = true;
    constructor() {
        super();
    }
    async setMeal(mealContent, mealName, date) {
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://overwrite
                data = await this.getDatesRow(date);
                switch (mealName) {
                    case "Breakfast":
                        data.breakfast = mealContent;
                        break;
                    case "Lunch":
                        data.lunch = mealContent;
                        break;
                    case "Dinner":
                        data.dinner = mealContent;
                        break;
                    case "Snack":
                        data.snack = mealContent;
                        break;
                }
                let fullContents = await this.getCSV();

                if (fullContents.length > 1) {
                    await this.overwriteFileRow(data, date);
                } else {//Overwrite the whole file since it was only today's row anyways
                    await this.writeCSV(data, date);
                }
                break;
            case this.FILE_STATUSES.fileExists://append
                data = this.createEmptyDayData();
                switch (mealName) {
                    case "Breakfast":
                        data.breakfast = mealContent;
                        break;
                    case "Lunch":
                        data.lunch = mealContent;
                        break;
                    case "Dinner":
                        data.dinner = mealContent;
                        break;
                    case "Snack":
                        data.snack = mealContent;
                        break;
                }
                await this.appendFile(data, date);
                break;
            case this.FILE_STATUSES.fileMissing://create
                data = this.createEmptyDayData();
                switch (mealName) {
                    case "Breakfast":
                        data.breakfast = mealContent;
                        break;
                    case "Lunch":
                        data.lunch = mealContent;
                        break;
                    case "Dinner":
                        data.dinner = mealContent;
                        break;
                    case "Snack":
                        data.snack = mealContent;
                        break;
                }
                await this.writeCSV(data, date);
                break;
        }
    }
    async getMeal(mealNumber, inputDate) {
        
        let fileStatus = await this.getFileStatus(inputDate);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist:
                data = await RNFS.readFile(this.PATH, 'utf8');
                data = data.replace(this.CSV_HEADER + '\n', '');
                let rows = Papa.parse(data, { delimiter: ",", skipEmptyLines: true });//why is rows[0] undefined?
                //get the row index that already exists
                console.log("row: " + rows.data[0][0]);
                let date = dayjs(inputDate).format('M/D/YYYY');
                const match = rows.data.find(row => row[0] === date);
                let result = "";
                switch (mealNumber) {
                    case "1":
                        result = match[this.DATA_DICTIONARY.breakfast];
                        break;
                    case "2":
                        result = match[this.DATA_DICTIONARY.lunch];
                        break;
                    case "3":
                        result = match[this.DATA_DICTIONARY.dinner];
                        break;
                    case "4":
                        result = match[this.DATA_DICTIONARY.snack];
                        break;
                }
                console.log("Returning: " + result);
                return result;
            case this.FILE_STATUSES.fileExists:
            case this.FILE_STATUSES.fileMissing://there is no data to pull
                return "";
        }
    }
}