import {Manager} from "./manager";

export class WeightManager extends Manager {
    constructor() {
        super();
    }
    //#region CRUD
    async setWeight(weight) {
        let fileStatus = await this.getFileStatus();
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.bothExist://read, overwrite, re-write
                data = await this.getLastRow();
                data.weight = weight;
                let newTodayRow = this.createEntireRow(data);
    
                let fullContents = await this.getCSV();
    
                if (fullContents.length > 1) {
                    fullContents.pop();
                    let inputString = '';
                    fullContents.forEach(row => {
                        inputString += (`${row}\n`);
                    });
                    inputString += newTodayRow;
                    await this.writeFileSeveralRows(inputString);
                } else {//Overwrite the whole file since it was only today's row anyways
                    await this.writeCSV(data);
                }
                break;
            case this.FILE_STATUSES.oneExist://append a new row WORKING
                data = this.createEmptyDayData();
                data.weight = weight;
                await this.appendFile(data);
                break;
            case this.FILE_STATUSES.noneExist://create a new file WORKING
                data = this.createEmptyDayData();
                data.weight = weight;
                await this.writeCSV(data);
                break;
        }
    }
    async getWeight() {
        let fileStatus = await this.getFileStatus();
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.bothExist:
            case this.FILE_STATUSES.oneExist://there may be data to pull
                let weights = await this.getEntireColumn(this.DATA_DICTIONARY.weight);
                let lastFilled = 0;
                for (let i = 0; i < weights.length; i++) {
                    if (weights[i] != "" || "Weight") {
                        lastFilled = i;
                    }
                }
                if (lastFilled == 0) {
                    console.log("returning 0");
                    return "0";
                } else {
                    console.log("last filled: " + lastFilled);
                    console.log("returning: " + weights[lastFilled]);
                    return weights[lastFilled];
                }
                break;
            case this.FILE_STATUSES.noneExist://there is no data to pull
                console.log("returning 0");
                return "0";
                break;
        }
    }
    //#endregion
}