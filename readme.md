# Goals
## Date Feature:
> A user can view/update/create data for a past date.
- Append function should now take in a date and the data
    - First checks to see if the date already has an existing row.
    - If not, create that row and move the dates after down a row
    - If so, update that row


Check the file status
switch on file statement
- The file does not exist
- The file does exist, but the row does not exist
    - In this case, if the date is not today we will need to move the other rows down. 
    - Or maybe there's a way to sort all the rows?
- The file AND row exist
    - In this case, simply update the correct row. 


### Functions to add/alter:
1. appendFile
3. addMiddleRow

    maybe make it so that the future dates are greyed out and disabled eventually

## Later features
- add icon
- Add three-part activity
- Delete one note
- Delete one activity
- View past dates
- edit past dates
- Graph for weight
- Write weight to health app
- Make prettier

## Code chunks
**How to re-bundle after making package changes:**
```
eas build --profile development --platform ios
```
**How to start the EAS**
```
npx expo start
```
**Link to calendar documentation**
https://github.com/farhoudshapouran/react-native-ui-datepicker 