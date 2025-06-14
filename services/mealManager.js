import { Manager } from "./manager";

export class MealManager extends Manager {
    CONSOLE_LOG = true;
    constructor() {
        super();
    }
    async setMeal(mealContent, mealName) {
        let fileStatus = await this.getFileStatus();
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.bothExist:
                data = await this.getLastRow();
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
            case this.FILE_STATUSES.oneExist:
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
                await this.appendFile(data);
                break;
            case this.FILE_STATUSES.noneExist:
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
                await this.writeCSV(data);
                break;
        }
    }
    async getMeal(mealNumber) {
        let fileStatus = await this.getFileStatus();
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.bothExist:
                data = await this.getLastRow();
                let result = "";
                switch (mealNumber) {
                    case "1":
                        result = data.breakfast;
                        break;
                    case "2":
                        result = data.lunch;
                        break;
                    case "3":
                        result = data.dinner;
                        break;
                    case "4":
                        result = data.snack;
                        break;
                }
                return result;
            case this.FILE_STATUSES.oneExist:
            case this.FILE_STATUSES.noneExist://there is no data to pull
                return "";
        }
    }
}