# Goals
## Date Feature:
> A user can view/update/create data for a past date.
- Append function should now take in a date and the data
    - First checks to see if the date already has an existing row.
    - If not, create that row and move the dates after down a row
    - If so, update that row

### Functions to add/alter:
1. appendFile
2. checkIfDateExists
3. addMiddleRow
4. 

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
