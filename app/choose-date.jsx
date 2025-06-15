import { Button, View, StyleSheet } from "react-native";
import { useState, useContext, useEffect } from 'react';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { DateContext } from "../services/DateContext";
import { useRouter } from "expo-router";

function ChooseDatePage() {
    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState(new Date());
    const { setCurrentDate } = useContext(DateContext);
    const router = useRouter();

    function handleSubmit() {
        setCurrentDate(selected);
        router.back();
    }

    return (
        <>
            <DateTimePicker
                mode="single"
                date={selected}
                onChange={({ date }) => setSelected(date)}
                styles={defaultStyles}
            />
            <View style={[styles.buttonRow]}>
                <Button title="Today"></Button>
                <Button title="Submit" onPress={() => { handleSubmit() }}></Button>
            </View>
        </>
    );
}

export default ChooseDatePage;

const styles = StyleSheet.create({
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        gap: 88,
    }
});