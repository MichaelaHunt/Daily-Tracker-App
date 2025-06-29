import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useState, useContext, useEffect } from 'react';
import {ActivityManager} from '../services/activityManager';
import Toast from 'react-native-root-toast';
import { DateContext } from '../services/DateContext';

function EnterActivityPage() {
    const [inputActivity, setInputActivity] = useState();
    const activityManager = new ActivityManager();
    const { currentDate } = useContext(DateContext);

    function handlePress() {
        activityManager.setActivity(inputActivity, currentDate);
        Toast.show('Saved successfully!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: 'green',
            textColor: 'white',
        });
    }

    function deleteButtonPress() {
        activityManager.deleteAllActivity();
        Toast.show('Deleted successfully!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: 'green',
            textColor: 'white',
        });
    }

    return (
        <>
            <View style={styles.body}>
                <View style={styles.inputContainer}>
                    <View style={[globalStyles.row, styles.item]}>
                        <Text style={styles.label}>Activity</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Running"
                            onChangeText={setInputActivity}
                        />
                    </View>
                    <View style={styles.line}></View>
                    <View style={[globalStyles.row, styles.item]}>
                        <Text style={styles.label}>Length</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="65"
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.line}></View>
                    <View style={[globalStyles.row, styles.item]}>
                        <Text style={styles.label}>Intensity</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Easy"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 24 }}>
                    <Button title='Submit' onPress={() => { handlePress() }}></Button>
                </View>
                <View style={{ marginTop: 24 }}>
                    <Button title='Delete All Activity' onPress={() => { deleteButtonPress() }}></Button>
                </View>
            </View>
        </>
    );
}

export default EnterActivityPage;

const styles = StyleSheet.create({
    body: {
        padding: 16,
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
        width: '85%',
    },
    item: {
        paddingTop: 8,
        paddingBottom: 8
    },
    line: {
        border: 'none',
        borderBottom: 'solid',
        borderColor: '#d9d8da',
        borderWidth: 0.5
    },
    label: {
        width: '60%',
    },
    input: {
        width: '40%',
    }
});