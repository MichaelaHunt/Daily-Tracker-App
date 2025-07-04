import { Text, View, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { globalStyles } from '../styles/globalStyles';
import { useState, useEffect, useContext } from 'react';
import Toast from 'react-native-root-toast';
import {MealManager} from '../services/mealManager';
import { DateContext } from '../services/DateContext';
import CustomButton from '../components/custom-button';


function EnterMealPage() {
    const { mealNumber } = useLocalSearchParams();
    const [inputMeal, setInputMeal] = useState();
    const [previous, setPrevious] = useState("");
    const [loading, setLoading] = useState(true);
    const { currentDate } = useContext(DateContext);
    const mealManager = new MealManager();

    useEffect(() => {
        async function getValue() {
            try {
                let result = await mealManager.getMeal(mealNumber, currentDate);
                setPrevious(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getValue();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // placeholder while loading
    }

    function handlePress() {
        mealManager.setMeal(inputMeal, label, currentDate);
        Toast.show('Saved!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: 'green',
            textColor: 'white',
        });
    }

    let label;
    switch (Number(mealNumber)) {
        case 1:
            label = 'Breakfast';
            break;
        case 2:
            label = 'Lunch';
            break;
        case 3:
            label = 'Dinner';
            break;
        default:
            label = 'Snack';
            break;
    }

    return (
        <>
            <View style={styles.body}>
                <Text style={[styles.text, globalStyles.sectionText]}>{label}</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} selectTextOnFocus={previous == '' ? false : true} multiline={true} scrollEnabled={false} onChangeText={setInputMeal} placeholder={previous}></TextInput>
                </View>
                <View style={{ marginTop: 24 }}>
                    <CustomButton label='Submit' function={() => { handlePress() }}></CustomButton>
                </View>
            </View>
        </>
    );
}

export default EnterMealPage;

const styles = StyleSheet.create({
    body: {
        paddingTop: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        backgroundColor: "white",
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
        width: '70%',
    },
    input: {
        height: 78,
    },
    text: {
        marginBottom: 16,
    }
});