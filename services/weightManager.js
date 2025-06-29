import {Manager} from "./manager";

export class WeightManager extends Manager {
    constructor() {
        super();
    }
    //#region CRUD
    async setWeight(weight, date) {
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://overwrite
                try {
                    data = await this.getDatesRow(date);
                    data.weight = weight;
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
                data.weight = weight;
                await this.appendFile(data, date);
                break;
            case this.FILE_STATUSES.fileMissing://create
                data = this.createEmptyDayData();
                data.weight = weight;
                await this.writeCSV(data, date);
                break;
        }
    }
    async getWeight(date) {
        let fileStatus = await this.getFileStatus(date);
        if (fileStatus == this.FILE_STATUSES.fileMissing) {
            return "0";
        }
        let weights = await this.getEntireColumn(this.DATA_DICTIONARY.weight);
        let lastFilled = -1;
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] != "" || "Weight") {
                lastFilled = i;
            }
        }
        if (lastFilled == -1) {
            return "0";
        } else {
            return weights[lastFilled];
        }
    }
    //#endregion
}