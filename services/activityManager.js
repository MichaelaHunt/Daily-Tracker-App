import {Manager} from "./manager";

export class ActivityManager extends Manager {

    constructor() {
        super();
    }
    async setActivity(activity) {
        if (this.CONSOLE_LOG == true)
            console.log("activity: " + activity);
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://read, append, re-write
                data = await this.getLastRow();
                if (data.activity == '') {
                    data.activity = [];
                }
                data.activity.push(activity);

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
            case this.FILE_STATUSES.fileExists:
                data = this.createEmptyDayData();
                data.activity = activity;
                await this.appendFile(data);
                break;
            case this.FILE_STATUSES.fileMissing:
                data = this.createEmptyDayData();
                data.activity = activity;
                await this.writeCSV(data);
                break;
        }
    }

    async getActivity(date) {
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://read, format
                data = await this.getLastRow();
                let result = String(data.activity).split(',');
                return result;
                break;
            case this.FILE_STATUSES.fileExists:
            case this.FILE_STATUSES.fileMissing:
                return [];
                break;
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