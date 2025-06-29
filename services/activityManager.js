import {Manager} from "./manager";

export class ActivityManager extends Manager {

    constructor() {
        super();
    }
    async setActivity(activity, date) {
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://read, append, re-write
                if (this.CONSOLE_LOG == true)
                    console.log("Set Activity - Entered File and Row Exist case");
                data = await this.getDatesRow(date);
                data.activity = Array.isArray(data.activity) ? data.activity : [];
                data.activity.push(activity);

                let fullContents = await this.getCSV();

                if (fullContents.length > 1) {
                    if (this.CONSOLE_LOG == true)
                    console.log("Activity - Overwriting the file row");
                    await this.overwriteFileRow(data, date);
                } else {//Overwrite the whole file since it was only today's row anyways
                    console.log("Activity - Overwriting the whole file");
                    await this.writeCSV(data, date);
                }
                break;
            case this.FILE_STATUSES.fileExists:
                if (this.CONSOLE_LOG == true)
                    console.log("Set Activity - Entered File Exists case");
                data = this.createEmptyDayData();
                data.activity = activity;
                await this.appendFile(data, date);
                break;
            case this.FILE_STATUSES.fileMissing:
                if (this.CONSOLE_LOG == true)
                    console.log("Set Activity - Entered File Missing case");
                data = this.createEmptyDayData();
                data.activity = activity;
                await this.writeCSV(data, date);
                break;
        }
    }

    async getActivity(date) {
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://read, format
                data = await this.getDatesRow(date);
                if (data.activity == []) {
                    return [];
                }
                let result = String(data.activity).split(',');
                return result;
            case this.FILE_STATUSES.fileExists:
            case this.FILE_STATUSES.fileMissing:
                return [];
        }
        return [];
    }

    async deleteAllActivity(date) {
        let fileStatus = await this.getFileStatus(date);
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://delete and re-write
                let data = await this.getLastRow();
                data.activity = [];

                let todayNewRow = this.createEntireRow(data);

                let fullContents = await this.getCSV();

                if (fullContents.length > 1) {
                    fullContents.pop();
                    let inputString = '';
                    fullContents.forEach(row => {
                        inputString += (`${row}\n`);
                    });
                    inputString += todayNewRow;
                    await this.writeFileSeveralRows(inputString);
                } else {
                    await this.writeCSV(data);
                }
                break;
            default:
                break;
        }
        if (CONSOLE_LOG)
            console.log("Leaving DeleteAllNotes");
    }
}