import { Button } from "react-native";
import { useState } from 'react';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';


function ChooseDatePage() {
    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState(new Date());

    function handleSubmit() {
        console.log("date: " + selected);
    }
    return (
        <>
            <DateTimePicker
                mode="single"
                date={selected}
                onChange={({ date }) => setSelected(date)}
                styles={defaultStyles}
            />
            <Button title="Submit" onPress={() => {handleSubmit()}}></Button>
        </>
    );
}

export default ChooseDatePage;