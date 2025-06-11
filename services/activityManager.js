import {Manager} from "./manager";

export class ActivityManager extends Manager {

    constructor() {
        super();
    }
    async setActivity(activity) {
        console.log("activity: " + activity);
        let fileStatus = await this.getFileStatus();
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.bothExist://read, append, re-write
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
            case this.FILE_STATUSES.oneExist:
                data = this.createEmptyDayData();
                data.activity = activity;
                await this.appendFile(data);
                break;
            case this.FILE_STATUSES.noneExist:
                data = this.createEmptyDayData();
                data.activity = activity;
                await this.writeCSV(data);
                break;
        }
    }

    async getActivity() {
        let fileStatus = await this.getFileStatus();
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.bothExist://read, format
                data = await this.getLastRow();
                let result = String(data.activity).split(',');
                return result;
                break;
            case this.FILE_STATUSES.oneExist:
            case this.FILE_STATUSES.noneExist:
                return [];
                break;
        }
        return [];
    }

    async deleteAllActivity() {
        let fileStatus = await this.getFileStatus();
        switch (fileStatus) {
            case this.FILE_STATUSES.bothExist://delete and re-write
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