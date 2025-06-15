import { Manager } from "./manager";

export class NotesManager extends Manager {
    constructor() {
        super();
    }
    //#region CRUD
    async setNotes(notes, date) {
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://read, append, re-write
                data = await this.getLastRow();
                data.notes.push(notes);

                let todayNewRow = this.createEntireRow(data);

                let fullContents = await this.getCSV();

                if (fullContents.length > 1) {
                    console.log("path1");
                    fullContents.pop();
                    let inputString = '';
                    fullContents.forEach(row => {
                        inputString += (`${row}\n`);
                    });
                    inputString += todayNewRow;
                    await this.writeFileSeveralRows(inputString);
                } else {
                    console.log("Data.notes: " + data.notes);
                    await this.writeCSV(data);
                }
                break;
            case this.FILE_STATUSES.fileExists:
                data = this.createEmptyDayData();
                data.notes = notes;
                await this.appendFile(data);
                break;
            case this.FILE_STATUSES.fileMissing:
                data = this.createEmptyDayData();
                data.notes = notes;
                await this.writeCSV(data);
                break;
        }
    }
    async getNotes(date) {
        let fileStatus = await this.getFileStatus(date);
        let data;
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://read, format
                data = await this.getLastRow();
                let result = String(data.notes).split(',');
                return result;
                break;
            case this.FILE_STATUSES.fileExists:
            case this.FILE_STATUSES.fileMissing:
                return [];
                break;
        }
        return [];
    }
    async deleteAllNotes(date) {
        let fileStatus = await this.getFileStatus(date);
        switch (fileStatus) {
            case this.FILE_STATUSES.fileAndRowExist://delete and re-write
                let data = await this.getLastRow();
                data.notes = [];
    
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
    //#endregion
}