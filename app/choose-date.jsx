import { View, StyleSheet } from "react-native";
import { useState, useContext, useEffect } from 'react';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { DateContext } from "../services/DateContext";
import { useRouter } from "expo-router";
import dayjs from 'dayjs';
import CustomButton from "../components/custom-button";

function ChooseDatePage() {
    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState(new Date());
    const { setCurrentDate } = useContext(DateContext);
    const router = useRouter();

    function handleSubmit() {
        setCurrentDate(selected);
        router.back();
    }

    function handleToday() {
        setCurrentDate(new Date());
        router.back();
    }

    function disableFutureDates(date) {
        return dayjs(date).isAfter(dayjs(), 'day');
    };

    return (
        <>
            <DateTimePicker
                mode="single"
                date={selected}
                onChange={({ date }) => setSelected(date)}
                styles={defaultStyles}
                disabledDates={disableFutureDates}
            />
            <View style={[styles.buttonRow]}>
                <CustomButton label='Today' function={() => {handleToday()}}></CustomButton>
                <CustomButton label='Submit' function={() => {handleSubmit()}}></CustomButton>
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